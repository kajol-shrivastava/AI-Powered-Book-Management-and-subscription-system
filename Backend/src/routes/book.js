import express from "express";
import {createBook , getBookById , getBooks , updateBookById , deleteBookById} from "../controllers/bookController.js";
import {createReview , updateReviewById , deleteReviewById} from "../controllers/reviewController.js";
import { authentication, authorization, createAuthorize ,checkPlanStatus } from "../middleware/auth.js";
const router = express.Router();


//<<-------------------------------------------Book API-------------------------------------------------->>
router.post('/',authentication,createAuthorize,createBook)
router.get('/',authentication,getBooks)
router.get('/:bookId',authentication , checkPlanStatus , getBookById)
router.put('/:bookId',authentication,authorization,updateBookById)
router.delete('/:bookId',authentication,authorization,deleteBookById)

//<<------------------------------------------Review API---------------------------------------------------->>
router.post('/:bookId/review', authentication , checkPlanStatus ,createReview)
router.put('/:bookId/review/:reviewId', authentication , updateReviewById)
router.delete('/:bookId/review/:reviewId', authentication ,deleteReviewById) 

export default router;