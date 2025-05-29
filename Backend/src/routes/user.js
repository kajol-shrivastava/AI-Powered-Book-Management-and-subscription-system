import express from 'express'
import {getDashboardData, registerUser} from "../controllers/userController.js";
import { markBookAsRead, saveBookForLater, removeSavedBook, getBookLists} from "../controllers/bookController.js";
import { subscribeToPlan } from "../controllers/subscriptionPlanController.js"
import { authentication ,checkPlanStatus } from "../middleware/auth.js";
import { getUserReviews } from '../controllers/reviewController.js';

const router = express.Router();

//<<----------------------------------------------User API----------------------------------------------->>
router.post('/register', registerUser)
router.post('/read-book', authentication , checkPlanStatus,  markBookAsRead )
router.post('/save-book', authentication ,checkPlanStatus , saveBookForLater )
router.post('/subscribe', authentication ,  subscribeToPlan)
router.delete('/save-book/:bookId', authentication , removeSavedBook )
router.get('/book-lists', authentication , getBookLists )
router.get('/dashboard', authentication , getDashboardData )
router.get('/reviews', authentication , getUserReviews )



export default router;