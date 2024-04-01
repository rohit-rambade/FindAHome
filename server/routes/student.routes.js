import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { createRentRequest } from "../controllers/student.controller.js";

const router = Router();

router.route("/rent-request").post(auth, createRentRequest);

export default router;
