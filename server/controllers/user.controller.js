import User from "../models/user.model.js";
import { generateAccessAndRefreshToken } from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";
import {
  validateUserSignIn,
  validateUserSignUp,
  validationError,
} from "../utils/validations/userValidations.js";
import { StudentProfile } from "../models/student.model.js";
import { LandlordProfile } from "../models/landlord.model.js";
import { Listing } from "../models/listing.model.js";

const signUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate user registration data
    const { error } = validateUserSignUp({
      username,
      email,
      password,
      role,
    });
    if (error) validationError(error);

    // Check if the user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res
        .status(409)
        .json({ success: false, message: "User Already Exists" });
    }

    // Create a new user
    const user = await User.create({
      username,
      email,
      password,
      role,
    });

    res
      .status(201)
      .json({ success: true, message: "User Sign Up Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = validateUserSignIn({
      email,
      password,
    });

    if (error) validationError(error);

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found" });
    }

    const correctPassword = await userExists.isPasswordCorrect(password);
    if (!correctPassword) {
      return res.status(409).json({
        success: false,
        message: "Invalid Password",
      });
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      userExists._id
    );
    console.log(accessToken, refreshToken);
    let loggedInUser;
    if (userExists.role === "student") {
      loggedInUser = await User.findById(userExists._id)
        .select("-password -refreshToken")
        .populate({
          path: "details",
          model: "StudentProfile",
        });
    } else if (userExists.role === "landlord") {
      loggedInUser = await User.findById(userExists._id)
        .select("-password -refreshToken")
        .populate({
          path: "details",
          model: "LandlordProfile",
          populate: {
            path: "listings",
            model: "Listing",
          },
        });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "User Sign In Successfully",
        data: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
const signOut = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "User Sign Out",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Request" });
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Refresh Token Or User Not Found",
      });
    }

    if (incomingRefreshToken !== user.refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Refresh Token Expired Or Used" });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Access Token Refreshed",
      });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

const createProfile = async (req, res) => {
  // const { id } = req.user._id;

  try {
    const { id } = req.user;
    // console.log(id, email, role);
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    if (user.role === "student") {
      const profileExists = await StudentProfile.findById(user.details);
      console.log("profileExists", profileExists);
      if (profileExists) {
        await StudentProfile.findByIdAndUpdate(profileExists._id, {
          ...req.body,
        });
        console.log("Profile updated:", profileExists._id);
        return res
          .status(201)
          .json({ success: true, message: "Profile updated" });
      } else {
        const savedProfile = await new StudentProfile({ ...req.body });
        await savedProfile.save();
        user.details = savedProfile._id;
        await user.save();
        console.log("Profile Created:", savedProfile._id);
        return res
          .status(201)
          .json({ success: true, message: "Profile Created" });
      }
    } else if (user.role == "landlord") {
      const profileExists = await LandlordProfile.findById(user.details);
      console.log("profileExists", profileExists);
      if (profileExists) {
        await LandlordProfile.findByIdAndUpdate(profileExists._id, {
          ...req.body,
        });
        console.log("Profile updated:", profileExists._id);
        return res
          .status(201)
          .json({ success: true, message: "Profile updated" });
      } else {
        const savedProfile = await new LandlordProfile({ ...req.body });
        await savedProfile.save();
        user.details = savedProfile._id;
        await user.save();
        console.log("Profile Created:", savedProfile._id);
        return res
          .status(201)
          .json({ success: true, message: "Profile Created" });
      }
    } else {
    }
  } catch (error) {
    console.log(error);
    res.json(502).json({ success: false, error });
  }

  // console.log(user.email);
  // res.json({ data: user });
};

export { signUp, signIn, signOut, refreshAccessToken, createProfile };
