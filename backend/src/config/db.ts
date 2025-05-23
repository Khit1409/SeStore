import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("connected mongodb~~!");
  } catch (error) {
    console.error("Cannot connect mongodb~~!", error);
    process.exit(1);
  }
};

export default connectDB;
