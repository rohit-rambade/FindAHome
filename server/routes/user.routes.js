import { Router } from "express";
import {
  createProfile,
  refreshAccessToken,
  signIn,
  signOut,
  signUp,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { getAllListings } from "../controllers/listings.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").post(auth, signOut);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/listings").get(getAllListings);
// Profile
router.route("/create-profile").post(auth, createProfile);

export default router;
