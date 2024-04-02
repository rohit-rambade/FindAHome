import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be at least 5 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "student", "landlord"],
    },
    details: {
      type: Schema.Types.ObjectId,
    },
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  try {
    const payload = {
      id: this._id,
      email: this.email,
      role: this.role,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15min",
    });
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
};

userSchema.methods.generateRefreshToken = function () {
  try {
    const payload = {
      id: this._id,
    };

    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
