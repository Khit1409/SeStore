import mongoose from "mongoose";
import Order from "../models/Order";
import { Request, Response } from "express";

//get cart for user
export const getCart = async (req: Request, res: Response) => {
  try {
    const user_id = new mongoose.Types.ObjectId(req.params.user_id);

    if (!user_id) {
      return res.status(400).json({ message: "Thiếu user_id trong request" });
    }

    const userCart = await Order.find({
      users: user_id,
      $or: [{ state_order: "wait_checking" }, { state_order: "unpaid" }],
    })
      .populate(
        "product_detail.product_id",
        "seller_id name price image brands state_product type_product"
      )
      .populate("product_detail.quantity")
      .populate("product_detail.attributes");

    res.status(200).json({ message: "", cart: userCart });
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};
//get cart detail for payment page
export const getCartForDetail = async (req: Request, res: Response) => {
  try {
    const cart_id = new mongoose.Types.ObjectId(req.params.cart_id as string);

    const cart_detail = await Order.findById({ _id: cart_id });

    if (cart_detail) {
      return res.status(200).json({ message: "cart detail:", cart_detail });
    }
  } catch (error) {
    return res.status(404).json({ message: "can not get this cart" });
  }
};
//cancelCart
export const cancelCart = async (req: Request, res: Response) => {
  try {
    const user_id = new mongoose.Types.ObjectId(req.params.user_id);
    const cart_id = new mongoose.Types.ObjectId(req.params.cart_id as string);
    const delete_cart = await Order.findByIdAndDelete(cart_id);
    if (delete_cart) {
      const carts = await Order.find({ users: user_id });
      return res
        .status(200)
        .json({ message: "Xóa thành công, giỏ hàng còn lại", carts });
    } else {
      return res.status(401).json({ message: "can not find and delete" });
    }
  } catch (error) {
    return res.status(404).json({ message: "delete failed!" });
  }
};
