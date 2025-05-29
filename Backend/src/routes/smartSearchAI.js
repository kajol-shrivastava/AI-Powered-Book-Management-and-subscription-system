import express from "express";
import {chatToDb} from "../controllers/smartSearchAlController.js"
import { authentication, checkPlanStatus } from "../middleware/auth.js";
const router = express.Router();

router.post("/chat-to-db", authentication , checkPlanStatus , chatToDb);


export default router;
