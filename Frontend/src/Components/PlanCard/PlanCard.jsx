// src/Components/PlanCard.js
import React from "react";
import {subscribePlan} from "../../services/plan"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const softColors = ["#f1f8e9", "#e3f2fd", "#fce4ec"]; // Light green, blue, pink

const PlanCard = ({ plan, index }) => {
  const handleSubscribe = async () => {
    try {
      const res = await subscribePlan(plan._id);
      if (res.status) {
        console.log(res)
        toast.success(res.message || "Subscribed successfully!");
      } else {
        toast.error(res.message || "Subscription failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: softColors[index % softColors.length],
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        marginBottom: "1.5rem",
      }}
    >
      <h2 style={{ marginBottom: "0.5rem", color: "#333" }}>{plan.planName}</h2>
      <p><strong>Price:</strong> ₹{plan.price}</p>
      <p><strong>Validity:</strong> {plan.validityInDays} days</p>
      <ul style={{ paddingLeft: "1.2rem", marginTop: "1rem", color: "#444" }}>
        {plan.planDescription.map((desc, i) => (
          <li key={i} style={{ marginBottom: "0.3rem" }}>{desc}</li>
        ))}
      </ul>
      <button
       onClick={handleSubscribe}
        style={{
          marginTop: "1rem",
          padding: "10px 20px",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Subscribe
      </button>
    </div>
  );
};

export default PlanCard;
