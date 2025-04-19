import mongoose, { Schema } from "mongoose";

type Attributes = {
  name: string;
  value: (string | number)[];
};

export interface IProduct extends mongoose.Document {
  productId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  image: string;
  brands: string;
  attributes: Attributes[];
  stateProduct: "new" | "used";
  typeProduct:
    | "all"
    | "fashion"
    | "vehicles"
    | "household_appliances"
    | "devices"
    | "other";
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    sellerId: { type: Schema.Types.ObjectId, ref: "Account" },
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
    stateProduct: {
      type: String,
      enum: ["new", "used"],
      required: true,
      default: "new",
    },
    typeProduct: {
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
