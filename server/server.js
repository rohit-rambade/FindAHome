import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/user.routes.js";
import landlordRoutes from "./routes/landlord.routes.js";
connectDB(); //database connection

app.use("/api/users", userRoutes);
app.use("/api/landlord", landlordRoutes);

app.listen(PORT, () => {
  console.log(`Server Started On Port ${PORT}`);
});
