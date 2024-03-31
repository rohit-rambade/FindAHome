import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createListing,
  deleteListing,
  getListingsForLandlord,
  updateListing,
} from "../controllers/landlord.controller.js";

const router = Router();

router.route("/create-listing").post(auth, createListing);

router.route("/update-listing/:listingId").post(auth, updateListing);
router.route("/delete-listing").delete(auth, deleteListing);

router.route("/get-listings").get(auth, getListingsForLandlord);

export default router;
