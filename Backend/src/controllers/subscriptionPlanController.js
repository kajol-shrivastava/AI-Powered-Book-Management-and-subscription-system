import SubscriptionPlan from "../models/subscriptionModel.js";
import User from "../models/UserModel.js";

export const createSubscriptionPlan = async (req, res) => {
  try {
    const userId = req.loginUserId;

    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
      return res.status(404).send({ status: false, message: "User not found", data: {} });
    }

    const { planName, planDescription, price, validityInDays  , features} = req.body;


    if (!planName || !planDescription || !price || !validityInDays) {
      return res.status(400).send({ status: false, message: "All fields are required", data: {} });
    }

    const isPlanExist = await SubscriptionPlan.findOne({ planName: { $regex: new RegExp(planName, "i") }, userId });
    if (isPlanExist) {
      return res.status(400).send({ status: false, message: "Plan with this name already exists", data: {} });
    }

    const newPlan = await SubscriptionPlan.create({
      planName,
      planDescription,
      price,
      validityInDays,
      userId,
    });

    return res.status(200).send({ status: true, message: "Subscription Plan created successfully", data: newPlan });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: `Internal Server Error - ${error.message}`, data: {} });
  }
};

export const getAllSubscriptionPlans = async (req, res) => {
  try {
    const userId = req.loginUserId;

    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
      return res.status(404).send({ status: false, message: "User not found", data: {} });
    }

    const plans = await SubscriptionPlan.find({ isDeleted: false }).sort({ createdAt: -1 });

    return res.status(200).send({ status: true, message: "All plans fetched successfully", data: plans });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: `Internal Server Error - ${error.message}`, data: {} });
  }
};

export const getSubscriptionPlan = async (req, res) => {
  try {
    const userId = req.loginUserId;
    const planId = req.params.planId;

    const plan = await SubscriptionPlan.findOne({ _id: planId, userId, isDeleted: false });
    if (!plan) {
      return res.status(404).send({ status: false, message: "Plan not found", data: {} });
    }

    return res.status(200).send({ status: true, message: "Plan details fetched successfully", data: plan });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: `Internal Server Error - ${error.message}`, data: {} });
  }
};

export const updateSubscriptionPlan = async (req, res) => {
  try {
    const userId = req.loginUserId;
    const planId = req.params.planId;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ status: false, message: "Invalid request body", data: {} });
    }

    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
      return res.status(404).send({ status: false, message: "User not found", data: {} });
    }

    const plan = await SubscriptionPlan.findOne({ _id: planId, userId, isDeleted: false });
    if (!plan) {
      return res.status(404).send({ status: false, message: "Plan not found", data: {} });
    }

    const { planName, planDescription, price, validityInDays } = req.body;
    const updateData = {};

    if (planName) {
      const isDuplicate = await SubscriptionPlan.findOne({ planName: { $regex: new RegExp(planName, "i") }, userId });
      if (isDuplicate && isDuplicate._id.toString() !== planId) {
        return res.status(400).send({ status: false, message: "Plan with this name already exists", data: {} });
      }
      updateData.planName = planName;
    }

    if (planDescription) updateData.planDescription = planDescription;
    if (price) updateData.price = price;
    if (validityInDays) updateData.validityInDays = validityInDays;

    await SubscriptionPlan.findByIdAndUpdate(planId, updateData);

    return res.status(200).send({ status: true, message: "Plan updated successfully", data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: `Internal Server Error - ${error.message}`, data: {} });
  }
};

export const deleteSubscriptionPlan = async (req, res) => {
  try {
    const userId = req.loginUserId;
    const planId = req.params.planId;

    const plan = await SubscriptionPlan.findOne({ _id: planId, userId, isDeleted: false });
    if (!plan) {
      return res.status(404).send({ status: false, message: "Plan not found", data: {} });
    }

    await SubscriptionPlan.findByIdAndUpdate(planId, { isDeleted: true });

    return res.status(200).send({ status: true, message: "Plan deleted successfully", data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: `Internal Server Error - ${error.message}`, data: {} });
  }
};


export const subscribeToPlan = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.loginUserId; // Assuming this is set by auth middleware

    if (!planId) {
      return res.status(400).json({ message: "planId is required" });
    }

    const plan = await SubscriptionPlan.findById(planId);
    if (!plan || plan.isDeleted) {
      return res.status(404).json({ message: "Subscription plan not found or inactive" });
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Number(plan.validityInDays));

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        subscription: {
          planId: plan._id,
          startDate,
          endDate
        }
      },
      { new: true }
    );

    res.status(200).json({
      status: true ,
      message: "Successfully subscribed to plan",
      subscription: updatedUser.subscription, 
    });

  } catch (error) {
    console.error("Error subscribing to plan:", error);
    res.status(500).json({ status:false , message: "Internal server error" , data : {}});
  }
};