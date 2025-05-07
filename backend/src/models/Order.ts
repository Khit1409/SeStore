import mongoose, { Schema } from "mongoose";

interface IOrder extends mongoose.Document {
  orderCode: number;
  users: mongoose.Types.ObjectId;
  product_items: {
    product_id: mongoose.Types.ObjectId;
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
    product_id: mongoose.Types.ObjectId;
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
      state_product: string;
      type_product: string;
    };
  }[];
  method_pay: string;
  state_order: string;
  shipping_status: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    orderCode: { type: Number, required: true, unique: true },
    users: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    product_items: [
      {
        product_id: {
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
          state_product: { type: String, required: true },
          type_product: { type: String, required: true },
        },
      },
    ],
    product_detail: {
      product_id: {
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
        state_product: { type: String, required: true },
        type_product: { type: String, required: true },
      },
    },

    method_pay: {
      type: String,
      enum: ["momo", "banking", "cod"],
      default: "cod",
    },
    state_order: {
      type: String,
      enum: ["paid", "unpaid", "wait_checking"],
      default: "wait_checking",
    },
    shipping_status: {
      type: String,
      enum: ["sold_delivered", "wait_shipping", "shipping"],
      default: "wait_shipping",
    },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema, "orders");

export default Order;
