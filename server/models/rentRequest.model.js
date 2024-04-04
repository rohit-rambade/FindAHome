import mongoose from "mongoose";

const { Schema } = mongoose;

const rentRequestSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
  message: {
    type: String,
    default: "",
  },
  additionalDetails: {
    type: String,
    default: "",
  },
  createdAt: { type: Date, default: Date.now },
});

const RentRequest = mongoose.model("RentRequest", rentRequestSchema);

export default RentRequest;
