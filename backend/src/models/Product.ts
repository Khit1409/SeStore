import mongoose, { Schema } from "mongoose";

type Attributes = {
  name: string;
  value: (string | number)[];
};

export interface IProduct extends mongoose.Document {
  productId: mongoose.Types.ObjectId;
  seller_id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  image: string;
  brands: string;
  attributes: Attributes[];
  state_product: string;
  type_product: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    seller_id: { type: Schema.Types.ObjectId, ref: "Account" },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    brands: { type: String, required: true },
    attributes: [
      {
        name: { type: String, required: true },
        value: {
          type: [mongoose.Schema.Types.Mixed],
          required: true,
        },
      },
    ],
    state_product: {
      type: String,
      enum: ["new", "used"],
      required: true,
      default: "new",
    },
    type_product: {
      type: String,
      enum: [
        "fashion",
        "vehicles",
        "household_appliances",
        "devices",
        "all",
        "other",
      ],
      required: true,
      default: "all",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema, "products");
export default Product;
