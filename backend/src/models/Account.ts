import mongoose from "mongoose";

interface IAccount extends mongoose.Document {
  avatar: string;
  fullname: string;
  email: string;
  password: string;
  birthday: Date;
  address: string;
  phone: string;
  role: string;
}

const accountSchema = new mongoose.Schema<IAccount>({
  avatar: { type: String },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthday: { type: Date },
  address: { type: String },
  phone: { type: String },
  role: { type: String, enum: ["user", "admin", "seller"], default: "user" },
});

const Account = mongoose.model("Account", accountSchema, "accounts");
export default Account;
