// models/SubscriptionPlan.js
import mongoose from "mongoose";

const subscriptionPlanSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  validityInDays: {
    type: Number, // e.g. 30, 90, 365
    required: true
  },
  planDescription: {
    type: [String], // List of included features
    default: []
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SubscriptionPlan = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
export default SubscriptionPlan; 