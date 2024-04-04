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
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "8B7ZyICbBuLYgHCRBF6DLkEq")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  console.log(isAuthentic);
  if (isAuthentic) {
    res.json({
      message: "Transaction is Verified",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

export { razorpayOrder, paymentVerification };
