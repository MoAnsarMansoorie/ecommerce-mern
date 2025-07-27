import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

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
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});