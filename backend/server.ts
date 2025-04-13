import express from "express";
import connectDB from "./src/config/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./src/auths/auth.routes";
import productRouter from "./src/products/product.routes";
dotenv.config();

const server = express();

// Kết nối DB
connectDB();

//cors
const corsOptions = {
  origin: ["http://localhost:5173", "http://192.168.1.6:5173"], // Cho phép kết nối từ frontend
  credentials: true, // Cho phép gửi cookie và xác thực (credentials)
};

// Middleware
server.use(express.json());
server.use(cookieParser());
server.use(cors(corsOptions));

//routes
server.use("/api/auths", authRoutes);
server.use("/api/products", productRouter);
// Khởi tạo server
const port = Number(process.env.PORT) || 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
