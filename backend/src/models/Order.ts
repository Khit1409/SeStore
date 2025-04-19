import mongoose, { Schema } from "mongoose";

interface IOrder extends mongoose.Document {
  users: mongoose.Types.ObjectId;
  productItems: [
    {
      productId: mongoose.Types.ObjectId;
      quantity: number;
      attributes: [];
    }
  ];
  address: string;
  totalProduct: number;
  createAt: Date;
  updateAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    users: { type: Schema.Types.ObjectId, ref: "Account" },
    productItems: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        attributes: [
          {
            name: { type: String },
            value: [{ type: String }],
          },
        ],
      },
    ],
    address: { type: String, required: true },
    totalProduct: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema, "orders");

export default Order;
