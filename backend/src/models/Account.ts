import mongoose from "mongoose";

interface IAccount extends mongoose.Document {
  _id: string;
  avatar: string;
  fullname: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  createAt: Date;
  updateAt: Date;
}

const accountSchema = new mongoose.Schema<IAccount>(
  {
    avatar: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema, "accounts");
export default Account;
