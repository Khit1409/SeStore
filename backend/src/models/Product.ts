import mongoose from "mongoose";

type Attributes = {
  name: string;
  value: (string | number)[];
};

interface IProduct extends mongoose.Document {
  name: string;
  price: number;
  image: string;
  brands: string;
  attributes: Attributes[];
  stateProduct: "new" | "used";
  typeProduct:
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
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    brands: { type: String, required: true },
    attributes: [
      {
        name: { type: String, required: true },
        value: {
          type: [mongoose.Schema.Types.Mixed], // ✅ Cho phép cả string và number
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
      enum: ["fashion", "vehicles", "household_appliances", "devices", "other"],
      required: true,
      default: "other",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema, "products");
export default Product;
