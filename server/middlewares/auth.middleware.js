import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const tokenFromCookie = req.cookies?.accessToken;
    const tokenFromHeader = req.header("Authorization")?.split(" ")[1];
    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized - Token not provided" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, error: "Unauthorized - Invalid token" });
  }
};

export { auth };
