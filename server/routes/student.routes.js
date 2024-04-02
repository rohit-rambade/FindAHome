import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createRentRequest,
  viewsentRequests,
} from "../controllers/student.controller.js";

const router = Router();

router.route("/rent-request").post(auth, createRentRequest);
router.route("/view-sent-requests").get(auth, viewsentRequests);
export default router;
