// import stripe from "stripe";
// import RentRequest from "../models/rentRequest.model.js";

// const stripeAPIKey =
//   "sk_test_51P1LHfSBx4K1u1HX7DIaKT2r3buKctTUi8IdDjGo44nb2FkyY0Pr53L2oCdRj22uAs89lAkBmRXO2sW5t5ZFjqAL00xJcHZVNH";
// const stripeInstance = new stripe(stripeAPIKey);

// const makePayment = async (req, res) => {
//   const { requestId } = req.params;
//   const { request } = req.body;

//   try {

//     const rentRequest = await RentRequest.findById(requestId).populate(
//       "listing"
//     );

//     if (!rentRequest) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Rent request not found" });
//     }

//     const lineItems = [
//       {
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: "Rent Payment",
//           },
//           unit_amount: rentRequest.listing.rent * 100,
//         },
//         quantity: 1,
//       },
//     ];

//     // Create a Stripe Checkout session
//     const session = await stripeInstance.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:5173/profile",
//       cancel_url: "http://localhost:5173/profile",
//     });

//     res.json({ sessionId: session.id });
//   } catch (error) {
//     console.error("Error creating Stripe Checkout session:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

import Razorpay from "razorpay";
import crypto from "crypto";
// Initialize Razorpay with your API key and secret
const razorpay = new Razorpay({
  key_id: "rzp_test_4XtuiyXKyGhqXK",
  key_secret: "8B7ZyICbBuLYgHCRBF6DLkEq",
});

const razorpayOrder = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    // Convert amount to integer (assuming amount is in paisa for INR)
    // const amountInPaisa = parseInt(amount) * 100;

    const options = {
      amount: Number(amount) * 100,
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send("Error creating Razorpay order");
    }
    console.log(order);
    res.json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const paymentVerification = async (req, res) => {
  console.log(req.body);
  res.status(200).json({ success: true });
};

// const makePayment = async (req, res) => {
//   const { requestId } = req.params;
//   const { request } = req.body;

//   try {
//     const rentRequest = await RentRequest.findById(requestId).populate(
//       "listing"
//     );

//     if (!rentRequest) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Rent request not found" });
//     }

//     const orderAmount = rentRequest.listing.rent * 100; // Amount in smallest currency unit (e.g., paisa for INR)

//     const options = {
//       amount: orderAmount,
//       currency: "INR",
//       receipt: "order_receipt", // You can customize this receipt ID as per your application's logic
//       payment_capture: 1, // Automatically capture payment after successful authorization
//     };

//     // Create an order using Razorpay API
//     const order = await razorpay.orders.create(options);

//     res.json({
//       orderId: order.id,
//       orderAmount: order.amount,
//       currency: order.currency,
//     });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

export { razorpayOrder, paymentVerification };
