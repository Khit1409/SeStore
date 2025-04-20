import mongoose from "mongoose";
import Order from "../models/Order";
import { Request, Response } from "express";

//adtocart

//get cart for user
export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId);

    if (!userId) {
      return res.status(400).json({ message: "Thiếu userId trong request" });
    }

    const userCart = await Order.find({ users: userId })
      .populate(
        "productItems.productId",
        "sellerId name price image brands stateProduct typeProduct"
      )
      .populate("productItems.quantity")
      .populate("productItems.attributes");

    res.status(200).json({ message: "", cart: userCart });
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

//get cart for order
export const getOrdersBySeller = async (req: Request, res: Response) => {
  try {
    const id = req.params.sellerId;
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    // Kiểm tra sellerId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "sellerId không hợp lệ" });
    }
    const skip = (page - 1) * limit;
    const sellerId = new mongoose.Types.ObjectId(id);
    // Lấy tất cả đơn hàng và populate thông tin sản phẩm
    const allOrders = await Order.find()
      .populate({
        path: "productItems.productId",
        model: "Product",
        select: "name price sellerId image brands stateProduct typeProduct",
      })
      .populate({
        path: "users",
        model: "Account",
        select: "fullname email phone",
      })
      .skip(skip)
      .limit(limit);
    // Lọc đơn hàng chứa sản phẩm của seller
    const sellerOrders = allOrders.filter((order) =>
      order.productItems.some((item) => {
        const product = item.productId as any;
        return product && product.sellerId?.equals(sellerId);
      })
    );
    res.status(200).json({
      message: "Các đơn hàng của shop bạn:",
      store: sellerOrders,
    });
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng theo seller:", error);
    res.status(500).json({ message: "Lỗi server" });
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
