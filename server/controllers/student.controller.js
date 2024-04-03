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
      status: "Pending",
      message: message || "",
      additionalDetails: additionalDetails || "",
    });

    const savedRequest = await newRentRequest.save();

    //new rent request ID to the student's
    await StudentProfile.findByIdAndUpdate(profileId, {
      $push: { sentRequests: savedRequest._id },
    });

    const landlordProfile = await LandlordProfile.findOneAndUpdate(
      { listings: listingId },
      { $push: { rentRequests: savedRequest._id } }, // Add the rent request to the profile
      { new: true }
    );

    res.status(201).json({ success: true, data: savedRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const viewsentRequests = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(id);

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const rentRequests = await RentRequest.find({ student: id }).populate({
      path: "listing",
      populate: {
        path: "landlord",
        model: "User",
        select: "details",
        populate: {
          path: "details",
          model: "LandlordProfile",
          select: "fullName phone address photo",
        },
      },
    });
    console.log(rentRequests);
    res.status(200).json({ success: true, data: rentRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { createRentRequest, viewsentRequests };
