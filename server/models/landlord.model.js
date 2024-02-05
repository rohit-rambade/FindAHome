import mongoose, { Schema } from "mongoose";

const landlordProfileSchema = new Schema({
  fullName: String,
  phone: String,
  about: String,
  address: String,
  photo: String,
  roomTypes: [
    {
      type: String,
      enum: ["Single Room", "Shared Room"],
    },
  ],
  amenities: [{ type: String, enum: ["Hot Water", "Tiffin", "Internet"] }],
  listings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
});

export const LandlordProfile = mongoose.model(
  "LandlordProfile",
  landlordProfileSchema
);
