import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").post(auth, signOut);
export default router;
