import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { createListing } from "../controllers/landlord.controller.js";

const router = Router();

router.route("/create-listing").post(auth, createListing);

export default router;
