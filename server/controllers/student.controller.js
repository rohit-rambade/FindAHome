import { LandlordProfile } from "../models/landlord.model.js";
import { Listing } from "../models/listing.model.js";
import RentRequest from "../models/rentRequest.model.js";
import { StudentProfile } from "../models/student.model.js";
import User from "../models/user.model.js";

const createRentRequest = async (req, res) => {
  try {
    const { studentId, listingId, message, additionalDetails } = req.body;
    const user = await User.findById(studentId);
    const profileId = user.details;
    // Check if user exists
    if (!user) {
      throw new Error("User not found");
    }
    // Check if the listing exists
    const listingExists = await Listing.findById(listingId);
    if (!listingExists) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    // Check if the student has already sent a request for this listing
    const existingRequest = await RentRequest.findOne({
      student: studentId,
      listing: listingId,
    });
    if (existingRequest) {
      return res
        .status(400)
        .json({ success: false, message: "Request already sent" });
    }

    const newRentRequest = new RentRequest({
      student: studentId,
      listing: listingId,
      status: "Pending", // Set initial status as Pending
      message: message || "", // Include the message if provided
      additionalDetails: additionalDetails || "", // Include additional details if provided
    });

    const savedRequest = await newRentRequest.save();

    // Add the new rent request ID to the student's sentRequests array
    await StudentProfile.findByIdAndUpdate(profileId, {
      $push: { sentRequests: savedRequest._id },
    });

    // Update the landlord's profile with the new rent request ID
    const landlordProfile = await LandlordProfile.findOneAndUpdate(
      { listings: listingId }, // Find the landlord profile associated with the listing
      { $push: { rentRequests: savedRequest._id } }, // Add the rent request to the profile
      { new: true }
    );

    res.status(201).json({ success: true, data: savedRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createRentRequest };
