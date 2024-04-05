import mongoose, { Schema } from "mongoose";

const studentProfileSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  aadharCard: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  parentContactNo: {
    type: String,
  },
  hodContactNo: {
    type: String,
  },
  institutionName: {
    type: String,
    required: true,
  },

  branch: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  sentRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RentRequest",
    },
  ],
  rentedHomes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
});

export const StudentProfile = mongoose.model(
  "StudentProfile",
  studentProfileSchema
);
