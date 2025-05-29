import jwt from 'jsonwebtoken';
import userModel from '../models/UserModel.js';
import bookmodel from '../models/bookModel.js'
import  {isValid, isValidObjectId } from '../validator/validator.js';

//================================================Authentication============================================//

const authentication=async (req,res,next)=>{
    try{
        let bearerToken = req.headers.authorization
        if (!bearerToken)
        return res.status(401).send({status:false,message:"Bearer Token must be present" , data:{}})
       
        bearerToken = bearerToken.split(" ")
        let token = bearerToken[1]

        if(!token){
            return res.status(401).send({status:false,message:"Authentication token not found" , data:{}})
        }
        jwt.verify(token,process.env.SECRET_KEY,async(err,decodedToken)=>{
            if(err){
                return res.status(500).send({status:false,message:err.message})
            }
            else{
                
                req.loginUserId=decodedToken.userId;
                next()
            }
        
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({status:false,message:`Internal Server Error - ${error.message}` ,data:{}});
    }
}

//=============================================Authorization========================================//


const createAuthorize=async function(req,res,next){
    try{
        let userId=req.body.userId
        if(!isValid(userId)){
            return res.status(400).send({ status: false, message: "userId is required!" })
        }
        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "invalid userId" })
        }

        const userExist = await userModel.findOne({_id:userId,isDeleted:false})
        if (!userExist) {
            return res.status(404).send({
                status: false,
                message: "user not found! please check userId"
            })
        }
        let userOfToken=req.decodedtoken.userId

        if(userId!=userOfToken){
            return res.status(403).send({
            status: false,
            message: "User logged in is not allowed to modify the requested book data"})
         }
        next()
        }
    
        catch (err) {
            res.status(500).send({ status: false, message: err.message });
        }
    }

const authorization = async function (req, res, next) {
    try {
        
        let bookId = req.params.bookId || req.body.bookId || req.query.bookId

        //validating userId

        if (!isValid(bookId)) {
            return res.status(400).send({ status: false, message: "bookId is required!" })
        }


        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "invalid bookId" })
        }

        const bookExist = await bookModel.findOne({_id:bookId,isDeleted:false})
        if (!bookExist) {
            return res.status(404).send({
                status: false,
                message: "book not found! please check bookId"
            })
        }

        let userId=bookExist.userId
        let userOfToken=req.decodedtoken.userId
        if (userOfToken!= userId) {
            return res.status(403).send({
                status: false,
                message: "User logged in is not allowed to modify the requested book data"
            });
        }
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }

};

//=======================================================Check for active plan============================================================
// middleware/checkPlanStatus.js
const checkPlanStatus = async(req, res, next) => {
  const userId = req.loginUserId; 

  const user = await userModel.findOne({_id:userId,isDeleted:false})
        if (!user) {
            return res.status(404).send({
                status: false,
                message: "user not found! please check userId"
            })
        }

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Please log in to continue.",
    });
  }

  const { subscription } = user;

  if (!subscription || !subscription.planId || !subscription.startDate || !subscription.endDate) {
    return res.status(403).json({
      success: false,
      message: "No active subscription found. Please subscribe to access this feature.",
    });
  }

  const currentDate = new Date();
  const endDate = new Date(subscription.endDate);

  if (currentDate > endDate) {
    return res.status(403).json({
      success: false,
      message: "Your subscription has expired. Please renew to continue accessing premium features.",
    });
  }

  // Subscription is valid
  next();
};



export { authentication, authorization,createAuthorize ,checkPlanStatus}