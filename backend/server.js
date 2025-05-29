import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";

import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import authRoute from "./routes/auth.route.js";
import reviewRoute from "./routes/review.route.js";
import orderRoute from "./routes/order.routes.js";

dotenv.config();
mongoose.set("strictQuery", true);

const app = express();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  exposedHeaders: ['set-cookie'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);


app.post("/api/get-signature", async (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.v2.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET
    );
    res.json({ timestamp, signature });
  } catch (error) {
    console.error("Cloudinary Signature Error:", error);
    res.status(500).json({ error: "Failed to generate signature" });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    res.status(errorStatus).json({ success: false, message: errorMessage });
});

// Start Server
app.listen(8800, () => {
    connect();
    console.log("Backend server is running!");
});
