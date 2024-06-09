import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createListing,
  deleteListing,
  getListingsForLandlord,
  markPaymentAsPaid,
  receivedRequests,
  updateListing,
  verifyAndAcceptRequest,
} from "../controllers/landlord.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/create-listing")
  .post(auth, upload.array("images"), createListing);
router.route("/test").post(upload.array("images"), (req, res) => {
  console.log(req.files);
  res.json({
    msg: "hello",
  });
});
router.route("/update-listing/:listingId").post(auth, updateListing);
router.route("/delete-listing").delete(auth, deleteListing);

router.route("/get-listings").get(auth, getListingsForLandlord);

router
  .route("/rent-request/:requestId/verify-accept")
  .put(auth, verifyAndAcceptRequest);

router
  .route("/rent-request/:requestId/mark-payment-paid")
  .put(auth, markPaymentAsPaid);

router.route("/received-requests").get(auth, receivedRequests);
export default router;
