// src/pages/Plans.js
import React, { useEffect, useState } from "react";
import PlanCard from "../Components/PlanCard/PlanCard";
import {getPlans} from "../services/plan"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await getPlans(); // Replace with actual endpoint
        setPlans(res.data);
      } catch (err) {
        console.error("Failed to fetch plans", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div style={{ width:"100%", paddingInline:"30px", overflowX:"hidden", boxSizing:"border-box"}}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Our Subscription Plans</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        plans.map((plan, index) => (
          <PlanCard key={plan._id} plan={plan} index={index} />
        ))
      )}

    <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Plans;
