import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
connectDb();
connectCloudinary();

// API config
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.post("api/v1/user", userRoute);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});