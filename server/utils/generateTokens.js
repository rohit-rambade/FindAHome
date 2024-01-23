export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateAccessToken();
    user.refreshToken = refreshToken;

    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return error.message;
  }
};
