import { Listing } from "../models/listing.model.js";

export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json({ success: true, data: listings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch listings" });
  }
};
