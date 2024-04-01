import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createListing,
  deleteListing,
  getListingsForLandlord,
  markPaymentAsPaid,
  updateListing,
  verifyAndAcceptRequest,
} from "../controllers/landlord.controller.js";

const router = Router();

router.route("/create-listing").post(auth, createListing);

router.route("/update-listing/:listingId").post(auth, updateListing);
router.route("/delete-listing").delete(auth, deleteListing);

router.route("/get-listings").get(auth, getListingsForLandlord);

router
  .route("/rent-request/:requestId/verify-accept")
  .put(auth, verifyAndAcceptRequest);

router
  .route("/rent-request/:requestId/mark-payment-paid")
  .put(auth, markPaymentAsPaid);

export default router;
