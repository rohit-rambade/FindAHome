import { LandlordProfile } from "../models/landlord.model.js";
import { Listing } from "../models/listing.model.js";
import User from "../models/user.model.js";

const createListing = async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id);

  const userDetails = await LandlordProfile.findById(user.details);
  console.log(userDetails);
  if (!user) {
    return res.status(400).json({ success: false, message: "User Not Found" });
  }

  try {
    const newListing = await new Listing(req.body);
    newListing.landlord = user;
    await newListing.save();

    console.log(userDetails);

    userDetails.listings.push(newListing);
    await userDetails.save();
    console.log("User after pushing listing:", user);
    res.status(201).json({ success: true, message: "Listing Added " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

export { createListing };
