import { Router } from "express";
import {
  createProfile,
  refreshAccessToken,
  signIn,
  signOut,
  signUp,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").post(auth, signOut);
router.route("/refresh-token").post(refreshAccessToken);

// Profile
router.route("/create-profile").post(auth, createProfile);

export default router;
