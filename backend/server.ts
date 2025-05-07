// server.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import PayOS from "@payos/node";

import connectDB from "./src/config/db";
import authRoutes from "./src/auths/auth.routes";
import productRoutes from "./src/products/product.routes";
import cartRoutes from "./src/carts/cart.routes";
import orderRoutes from "./src/orders/order.routes";
import paymentRoutes from "./src/payments/payment.routes";

dotenv.config();

const server = express();

// Kết nối database
connectDB();

// Khởi tạo PayOS
export const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID as string,
  process.env.PAYOS_API_KEY as string,
  process.env.PAYOS_CHECKSUM_KEY as string
);

// Cấu hình CORS
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

// Middleware
server.use(cors(corsOptions));
server.use(express.json());
server.use(cookieParser());

// Routes
server.use("/api/auths", authRoutes);
server.use("/api/products", productRoutes);
server.use("/api/carts", cartRoutes);
server.use("/api/orders", orderRoutes);
server.use("/api/checkouts", paymentRoutes);

// Server listen
const PORT = Number(process.env.PORT) || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
