import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 5000;

const app = express();

import { connectDB } from "./config/database.js";
connectDB(); //database connection

app.listen(PORT, () => {
  console.log(`Server Started On Port ${PORT}`);
});
