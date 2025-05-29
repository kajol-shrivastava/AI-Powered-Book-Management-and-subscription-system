import mongoose from 'mongoose';
const objectId=mongoose.Schema.Types.ObjectId

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:"title is required",
        unique:true,
        trim:true
    },
    excerpt:{
        type:String,
        required:"excerpt is required",
        trim:true

    },
    author:{
        type:String,
        trim: true
    },
    coverImage:{
        type: String,
        trim : true
    },
    userId:{
        type:objectId,
        ref:"User",
        required:true
    },
    ISBN:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    category:{
        type:String,
        required:"category is required",
        trim:true
    },
    subcategory:{
        type:[String],
        required:"subcategory is required",
        trim:true
    },
    reviews:{
        type:Number,
        default:0,
        Comment:"Holds the number of reviews of this book"

    },
    publisher:{
        type: String
    },
    avgRating:{
        type : Number,
    },
    description:{
        type: String
    },
    mrp:{
        type: String
    },
    disconutedPrice:{
        type: String
    },
    language:{
        type: [String]
    },
    pages :{
        type : Number
    },
    releasedAt:{
        type:Date,
        required:true
    },
    deletedAt:{
        type:Date
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

const Book = mongoose.model("Book", bookSchema);
export default Book; 