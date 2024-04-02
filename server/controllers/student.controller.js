import { LandlordProfile } from "../models/landlord.model.js";
import { Listing } from "../models/listing.model.js";
import RentRequest from "../models/rentRequest.model.js";
import { StudentProfile } from "../models/student.model.js";

const createRentRequest = async (req, res) => {
  try {
    const { studentId, listingId, message, additionalDetails } = req.body;

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

    // Create a new rent request if no existing request is found
    const newRentRequest = new RentRequest({
      student: studentId,
      listing: listingId,
      status: "Pending",
      message: message || "",
      additionalDetails: additionalDetails || "",
    });

    const savedRequest = await newRentRequest.save();

    // Add the new rent request ID
    await StudentProfile.findByIdAndUpdate(studentId, {
      $push: { sentRequests: savedRequest._id },
    });

    // Update the landlord's profile with the new rent request ID
    const landlordProfile = await LandlordProfile.findOneAndUpdate(
      { listings: listingId },
      { $push: { rentRequests: savedRequest._id } },
      { new: true }
    );

    res.status(201).json({ success: true, data: savedRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createRentRequest };
