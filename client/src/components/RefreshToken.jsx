import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const RefreshToken = () => {
  const { refreshToken } = useSelector((state) => state.auth);
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "/api/users/refresh-token",
        { refreshToken: refreshToken },
        { withCredentials: true }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };

  // Call refreshAccessToken function when the component mounts
  useEffect(() => {
    refreshAccessToken();
  }, []);

  return <div>Refreshing Access Token...</div>;
};

export default RefreshToken;
