import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/user.routes.js";
connectDB(); //database connection

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server Started On Port ${PORT}`);
});
