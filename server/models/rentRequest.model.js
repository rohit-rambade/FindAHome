import mongoose from "mongoose";

const { Schema } = mongoose;

const rentRequestSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to student profile
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  }, // Reference to listing
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  }, // Status of the request
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  }, // Payment status
  message: {
    type: String,
    default: "",
  }, // Message from student to landlord
  additionalDetails: {
    type: String,
    default: "",
  }, // Additional details provided by student
  createdAt: { type: Date, default: Date.now },
});

const RentRequest = mongoose.model("RentRequest", rentRequestSchema);

export default RentRequest;
