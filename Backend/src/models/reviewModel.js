import mongoose from 'mongoose';
const objectId=mongoose.Schema.Types.ObjectId

const reviewSchema=new mongoose.Schema({
    bookId:{
        type:objectId,
        ref:"Book",
        required:true
    },
    reviewedBy:{
        type:String,
        required:true,
        default:"Guest",

    },
    userId:{
        type:objectId,
        ref:"User"
    },
    reviewedAt:{
        type:Date,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    review:{
        type:String,

    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    

},{timestamps:true})

const Review = mongoose.model("Review", reviewSchema);
export default Review; 