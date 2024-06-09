import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/payment.model.js";
import { StudentProfile } from "../models/student.model.js";
import User from "../models/user.model.js";
import { LandlordProfile } from "../models/landlord.model.js";

const razorpay = new Razorpay({
  key_id: "rzp_test_4XtuiyXKyGhqXK",
  key_secret: "8B7ZyICbBuLYgHCRBF6DLkEq",
});

const razorpayOrder = async (req, res) => {
  try {
    const { amount, currency, receipt, listingId } = req.body;
    const { id, profileDetailId } = req.user;
    const options = {
      amount: Number(amount) * 100,
      currency,
      receipt,
    };
    const studentProfileDetails = await StudentProfile.findById(
      profileDetailId
    );
    if (studentProfileDetails.rentedHomes.includes(listingId)) {
      return res
        .status(400)
        .json({ success: false, message: "Listing already purchased" });
    }
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
  const {
    landlordId,
    listingId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;
  const { id, profileDetailId } = req.user;
  console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "8B7ZyICbBuLYgHCRBF6DLkEq")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  console.log(isAuthentic);
  if (isAuthentic) {
    try {
      const studentProfileDetails = await StudentProfile.findById(
        profileDetailId
      );
      if (studentProfileDetails.rentedHomes.includes(listingId)) {
        return res
          .status(400)
          .json({ success: false, message: "Listing already purchased" });
      }
      const payment = new Payment({
        landlordId: landlordId,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        status: "success",
        amount: 500,
      });

      // Save the payment record
      await payment.save();
      console.log(payment);

      const landlordDetailsId = await User.findById(landlordId);
      console.log(landlordDetailsId.details);

      const landlord = await LandlordProfile.findOneAndUpdate(
        { _id: landlordDetailsId.details },
        {
          $push: { rentedListings: { listingId, student: id } },
        },
        { new: true }
      );

      const studentProfile = await StudentProfile.findByIdAndUpdate(
        profileDetailId,
        { $push: { rentedHomes: listingId } },
        { new: true }
      );

      res.json({
        message: "Payment Successful!",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    } catch (error) {
      console.error("Error saving payment:", error);
      res.status(500).json({ success: false, message: "Error saving payment" });
    }
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

export { razorpayOrder, paymentVerification };
