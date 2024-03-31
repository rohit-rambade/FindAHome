import cloudinary from "../config/cloudinaryConfig.js";
import { LandlordProfile } from "../models/landlord.model.js";
import { Listing } from "../models/listing.model.js";
import User from "../models/user.model.js";

const createListing = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    const userDetails = await LandlordProfile.findById(user.details);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    // Handle image upload to Cloudinary
    const { images } = req.body;
    const uploadedImages = [];

    // Loop through each image URL
    for (const imageUrl of images) {
      // Assuming imageUrl is the URL of the image to be uploaded
      const uploadOptions = { folder: "SHF" }; // Customize folder name if needed

      const result = await new Promise((resolve, reject) => {
        // Use cloudinary.uploader.upload to upload the image directly from the URL
        cloudinary.uploader.upload(imageUrl, uploadOptions, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
      });

      uploadedImages.push(result.secure_url);
    }

    const newListing = new Listing({
      ...req.body,
      images: uploadedImages,
      landlord: user,
    });

    await newListing.save();

    userDetails.listings.push(newListing);
    await userDetails.save();

    res.status(201).json({ success: true, message: "Listing Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateListing = async (req, res) => {
  const { id } = req.user;
  const { listingId } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const listingToUpdate = await Listing.findById(listingId);
    if (!listingToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Listing Not Found" });
    }
    console.log(listingToUpdate);

    Object.assign(listingToUpdate, req.body);
    await listingToUpdate.save();

    res.status(200).json({ success: true, message: "Listing Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteListing = async (req, res) => {
  const { id } = req.user;
  const { listingId } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing Not Found" });
    }

    await Listing.findByIdAndDelete(listingId);
    const userDetails = await LandlordProfile.findById(user.details);
    if (userDetails) {
      userDetails.listings.pull(listingId);
      await userDetails.save();
    }

    res.status(200).json({ success: true, message: "Listing Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getListingsForLandlord = async (req, res) => {
  const { landlordId } = req.body;

  try {
    const listings = await Listing.find({ landlord: landlordId });

    log;
    res.status(200).json({ success: true, data: listings });
  } catch (error) {
    handleError(error, res);
  }
};

export { createListing, updateListing, deleteListing, getListingsForLandlord };
