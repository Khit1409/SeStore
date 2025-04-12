import mongoose, { Schema } from "mongoose";

interface IOrder extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  address: string;
  totalProduct: number;
  createAt: Date;
  updateAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Account" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    address: { type: String, required: true },
    totalProduct: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema, "orders");

export default Order;
