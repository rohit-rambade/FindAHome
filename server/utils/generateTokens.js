import User from "../models/user.model.js";
export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateAccessToken();
    user.refreshToken = refreshToken;

    user.save({ validateBeforeSave: false });
    console.log(accessToken, refreshToken);
    return { accessToken, refreshToken };
  } catch (error) {
    return error.message;
  }
};
