import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createRentRequest,
  viewsentRequests,
} from "../controllers/student.controller.js";
import {
  paymentVerification,
  razorpayOrder,
} from "../controllers/paymentController.js";

const router = Router();

router.route("/rent-request").post(auth, createRentRequest);
router.route("/view-sent-requests").get(auth, viewsentRequests);
// router.post("/rent-requests/:requestId/process-payment", makePayment);
router.route("/payment-order").post(auth, razorpayOrder);
// router.route("/payment-verification").post(paymentVerification);
export default router;
