import express from 'express'
import {login  , registerUser} from "../controllers/userController.js";

const router = express.Router();

//<<----------------------------------------------User API----------------------------------------------->>
router.post('/login', login)

export default router;

