import bookModel from '../models/bookModel.js'
import userModel from "../models/UserModel.js"
import reviewModel from "../models/reviewModel.js"
import jwt from  'jsonwebtoken'
import {isValid, 
    isValidRequest,
    isValidMail ,
    isValidMobile,
    isValidUser,
isValidTitle,
checkPassword,
isValidObjectId,
extraspace,
isValidISBN,
checkarray,
isValidDate} from "../validator/validator.js"




//<<----------------------------------------------create book--------------------------------------------->>
const createBook = async function(req, res) {
    try {
        const data = req.body;

        if (!isValidRequest(data)) {
            return res.status(400).send({ status: false, message: "please enter a valid input" })
        }

        //extracting params
        let {
        title, excerpt, userId, ISBN, category, subcategory, releasedAt,
        author, coverImage, publisher, avgRating, description,
        mrp, disconutedPrice, language, pages 
        } = data;
        let newBook={}
        newBook.userId=userId


         //validating title
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "Title is required" })
        }

        title=title.trim()
        let isTitleAlreadyExist=await bookModel.findOne({title: { $regex: title, $options: 'i' },isDeleted:false})
        if(isTitleAlreadyExist){
            return res.status(409).send({ status: false, message: "book with this title already exist" }) 
        }
        title=extraspace(title)
        newBook.title=title

        //validating excerpt
        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, message: "excerpt is required" })
        }
        excerpt=extraspace(excerpt)
        newBook.excerpt=excerpt

       //validating ISBN
        if(!isValid(ISBN)){
            return res.status(400).send({status:false,message:"ISBN is required!"})
        }

        if(!isValidISBN(ISBN)){
            return res.status(400).send({status:false,message:"invalid ISBN code"})   
        }

        let isISBNAlreadyExist=await bookModel.findOne({ISBN:ISBN,isDeleted:false})
        if(isISBNAlreadyExist){
            return res.status(409).send({ status: false, message: "book with this ISBN code already exist" }) 
        }
        newBook.ISBN=ISBN


        //validating category
        if(!isValid(category)){
            return res.status(400).send({status:false,message:"category is required!"})
        }

        newBook.category=category

           
       if(Array.isArray(subcategory)){
           let result=checkarray(subcategory)
           if(result!=true){
            return res.status(400).send({status:false,message:result})
           }
       }   
       
       if(typeof(subcategory)=="string"){
       if(!isValid(subcategory))
        return res.status(400).send({status:false,message:"subcategory is required!"})
       }

       newBook.subcategory=subcategory


       //validating releasedAt
       if(!releasedAt){
        return res.status(400).send({status:false,message:"releasedAt field  is required!"})
       }
       
       if(!isValidDate(releasedAt)){
        return res.status(400).send({status:false,message:"Date should be in this format(YYYY-MM-DD)"})
       }
       newBook.releasedAt=releasedAt

       // Optional fields
        if (author) newBook.author = author;
        if (coverImage) newBook.coverImage = coverImage;
        if (publisher) newBook.publisher = publisher;
        if (avgRating) newBook.avgRating = avgRating;
        if (description) newBook.description = description;
        if (mrp) newBook.mrp = mrp;
        if (disconutedPrice) newBook.disconutedPrice = disconutedPrice;
        if (Array.isArray(language)) newBook.language = language;
        if (pages) newBook.pages = pages;

       //Creating book
        const newbook = await bookModel.create(newBook)
        res.status(201).send({status : true,message:"success",data : newbook})
    } catch (error) {
        console.error(error)
        res.status(500).send({status : false,message : error.message})
    }
}


//<<-----------------------------------------------get book-------------------------------------------------->>
const getBooks=async function(req,res){
    try{
        const data=req.query
        let {userId,category,subcategory}=data
        const filter={}
        filter.isDeleted=false
        
        if(userId){
           
            if (!isValid(userId)) {
                return res.status(400).send({ status: false, message: "userId field is empty" })
            }
            if(!isValidObjectId(userId)){
                return res.status(400).send({status:false,message:"Invalid user Id"})
            }
           let  validuser=await user.findById(userId)
            if(!validuser){
                return res.status(404).send({status:false,message:"user with this Id not found"})
            }
            filter.userId=userId

        }

        if(category){
            if (!isValid(category)) {
                return res.status(400).send({ status: false, message: "category field is empty" })
            }
            filter.category=category
        }
        if(subcategory){
            if (!isValid(subcategory)) {
                return res.status(400).send({ status: false, message: "subcategory field is empty" })
            }
            filter.subcategory=subcategory
        }

        const getbooks=await bookModel.find(filter).select({_id:1,title:1,excerpt:1,userId:1,
            category:1,reviews:1,releasedAt:1,coverImage:1 , author: 1 , avgRating: 1})
        
        res.status(200).send({status:true,message:"Books list",data:getbooks})
     }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }}


//<<------------------------------------------get book by Id--------------------------------------------->>    
const getBookById=async function(req,res){
    try{
        let bookId=req.params.bookId

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "invalid bookId" })
        }
        const bookdetail=await bookModel.findOne({_id:bookId,isDeleted:false})
        if(!bookdetail){
            return res.status(404).send({status:false,message:"No books found"}) 
        }
        const reviews=await reviewModel.find({bookId:bookId,isDeleted:false})
        
        bookdetail._doc["reviewsData"]=reviews
        res.status(200).send({status:true,message:"Books list",data:bookdetail})

    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}


//<<--------------------------------------------Update book by Id------------------------------------------>>
const updateBookById = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const condition = req.body
        if(!isValidRequest(condition)){
            return res.status(400).send({ status: false, message: "please enter a valid input" })
        }

        let {
        title, excerpt, userId, ISBN, category, subcategory, releasedAt,
        author, coverImage, publisher, avgRating, description,
        mrp, disconutedPrice, language, pages
        } = req.body;
        let update={}
        
        //validation starts
        if(title){
            if(title.trim()==0){
                return res.status(400).send({ status: false, message: "please send some value in title to update" })
            }
            title=title.trim()
            let isTitleAlreadyExist=await bookModel.findOne({title: { $regex: title, $options: 'i' },isDeleted:false})
            
            if(isTitleAlreadyExist){
                return res.status(409).send({ status: false, message: "book with this title already exist" }) 
            }
            title=extraspace(title)
            update.title=title
          }

          if(excerpt){
              if(excerpt.trim()==0){
                return res.status(400).send({ status: false, message: "please send some value in excerpt to update" })   
              }
              excerpt=extraspace(excerpt)
              update.excerpt=excerpt
          }

          

          if(releasedAt){
            if(releasedAt.trim()==0){
                return res.status(400).send({ status: false, message: "please send some value in releasedAt to update" })   
              }
            if(!isValidDate(releasedAt)){
                return res.status(400).send({status:false,message:"Date should be in this format(YYYY-MM-DD)"})
               }
              update.releasedAt=releasedAt
            }

            if(ISBN){
                if(!isValidISBN(ISBN)){
                    return res.status(400).send({status:false,message:"invalid ISBN code"})
                }
                let isISBNAlreadyExist=await bookModel.findOne({ISBN:ISBN,_id:bookId,isDeleted:false})
                if(isISBNAlreadyExist){
                    return res.status(409).send({ status: false, message: "book with this ISBN code already exist" }) 
                }
                update.ISBN=ISBN
            }

            // Optional updatable fields
        if (author) update.author = author;
        if (coverImage) update.coverImage = coverImage;
        if (publisher) update.publisher = publisher;
        if (avgRating) update.avgRating = avgRating;
        if (description) update.description = description;
        if (mrp) update.mrp = mrp;
        if (disconutedPrice) update.disconutedPrice = disconutedPrice;
        if (Array.isArray(language)) update.language = language;
        if (pages) update.pages = pages;
                
        const data = await bookModel.findOneAndUpdate({_id : bookId, isDeleted : false}, update, {new : true})
        res.status(200).send({status : true,message:"success",data : data})
    } 
    catch (error) {
        console.error(error)
        res.status(500).send({status : false,message : error.message})
    }
}


//<<----------------------------------------------delete book by Id--------------------------------------------->>
const deleteBookById = async function(req, res) {
    try {
        
        const bookId = req.params.bookId
        const time = Date.now('YYYY/MM/DD:mm:ss')
        const update = { isDeleted: true, deletedAt: time }
        
        const deletedbook = await bookModel.findOneAndUpdate({_id : bookId, isDeleted : false}, update, {new : true})
        if(deletedbook){
            res.status(200).send({status : true,
            message : "Data Deleted Successfully"})
        }
        else{
            res.status(404).send({status : false,
            message : "No Data with this book Id Found"})
        }

    } catch (error) {
        res.status(500).send({status : false,
        message: error.message}) 
    }
}

const markBookAsRead = async (req, res) => {
  const userId = req.loginUserId;
  const { bookId } = req.body;

  try {
    const user = await userModel.findById(userId);

    // Remove if already exists
    user.continueReading = user.continueReading.filter(
      entry => entry.bookId.toString() !== bookId
    );

    // Push with updated timestamp
    user.continueReading.push({ bookId, lastReadAt: new Date() });

    await user.save();

    res.status(200).json({ status: true, message: 'Book added to continue reading.' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Server error.' });
  }
};

const saveBookForLater = async (req, res) => {
  const userId = req.loginUserId;
  const { bookId } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user.savedBooks.includes(bookId)) {
      user.savedBooks.push(bookId);
    }

    await user.save();
    res.status(200).json({ status: true, message: 'Book saved successfully.' , data:{} });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Server error.' , data:{} });
  }
};

const removeSavedBook = async (req, res) => {
  const userId = req.loginUserId;
  const { bookId } = req.params;

  try {
    await userModel.findByIdAndUpdate(userId, {
      $pull: { savedBooks: bookId }
    });

    res.status(200).json({ status: true, message: 'Book removed from saved list.' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Server error.' });
  }
};

const getBookLists = async (req, res) => {
  try {
    const user = await userModel.findById(req.loginUserId)
      .populate('continueReading.bookId')
      .populate('savedBooks');

    res.status(200).json({
      status:true, 
      message: 'success',
      data:{
        continueReading: user.continueReading,
        savedBooks: user.savedBooks
      }
      
    });
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: false, message: 'Internal Server error.', data : {} });
  }
};



export {createBook,getBooks,getBookById,updateBookById,deleteBookById ,markBookAsRead ,saveBookForLater ,removeSavedBook ,getBookLists}

