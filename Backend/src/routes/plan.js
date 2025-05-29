import express from 'express'
import {createSubscriptionPlan, getAllSubscriptionPlans , getSubscriptionPlan , updateSubscriptionPlan , deleteSubscriptionPlan} from "../controllers/subscriptionPlanController.js";
import { authentication } from '../middleware/auth.js';
const router = express.Router();

//<<----------------------------------------------Plan API----------------------------------------------->>

router.post("/", authentication , createSubscriptionPlan);
router.get("/", authentication , getAllSubscriptionPlans);
router.get("/:planId", authentication , getSubscriptionPlan);
router.put("/:planId", authentication , updateSubscriptionPlan);
router.delete("/:planId", authentication ,deleteSubscriptionPlan);

export default router;

