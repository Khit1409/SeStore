import mongoose, { Schema } from "mongoose";

interface IOrder extends mongoose.Document {
  users: mongoose.Types.ObjectId;
  productItems: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    attributes: {
      name: string;
      value: string[];
    }[];
    snapshot: {
      name: string;
      price: number;
      image: string;
      brands: string;
      stateProduct: string;
      typeProduct: string;
    };
  }[];
  product_detail: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    attributes: {
      name: string;
      value: string[];
    }[];
    snapshot: {
      name: string;
      price: number;
      image: string;
      brands: string;
      stateProduct: string;
      typeProduct: string;
    };
  }[];
  methodPay: string;
  stateOrder: string;
  shippingStatus: string;
  address: string;
  totalProduct: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    users: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    productItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        attributes: [
          {
            name: { type: String, required: true },
            value: [{ type: String, required: true }],
          },
        ],
        snapshot: {
          name: { type: String, required: true },
          price: { type: Number, required: true },
          image: { type: String, required: true },
          brands: { type: String, required: true },
          stateProduct: { type: String, required: true },
          typeProduct: { type: String, required: true },
        },
      },
    ],
    product_detail: {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      attributes: [
        {
          name: { type: String, required: true },
          value: [{ type: String, required: true }],
        },
      ],
      snapshot: {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        brands: { type: String, required: true },
        stateProduct: { type: String, required: true },
        typeProduct: { type: String, required: true },
      },
    },

    methodPay: {
      type: String,
      enum: ["momo", "banking", "cod"],
      default: "cod",
    },
    stateOrder: {
      type: String,
      enum: ["paid", "unpaid", "wait_checking"],
      default: "wait_checking",
    },
    shippingStatus: {
      type: String,
      enum: ["sold_delivered", "wait_shipping", "shipping"],
      default: "wait_shipping",
    },
    address: { type: String, required: true },
    totalProduct: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema, "orders");

export default Order;
