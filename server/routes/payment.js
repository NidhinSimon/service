import express from "express";
 import stripe from "../utils/stripeConfig";

 const router=express.Router()



 router.post("/create-payment-intent", async (req, res) => {
    try {
      const { amount } = req.body;
  
      // Create a payment intent
      const paymentIntent = await stripeConfig.paymentIntents.create({
        amount: amount,
        currency: "usd",
      });
  
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: "Unable to create payment intent" });
    }
  });
  
  export default router;