import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../models/Order";
import Product from "../models/Product";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { attributes, quantity, address, user_id, method_pay } = req.body;
    const product_id = new mongoose.Types.ObjectId(req.params.product_id);

    // Tìm sản phẩm trong collection Product
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    const orderCode = Date.now();
    const newCart = new Order({
      orderCode,
      users: user_id,
      product_items: [
        {
          product_id: product._id,
          quantity,
          attributes,
          snapshot: {
            name: product.name,
            price: product.price,
            image: product.image,
            brands: product.brands,
            state_product: product.state_product,
            type_product: product.type_product,
          },
        },
      ],
      product_detail: {
        product_id: product._id,
        quantity,
        attributes,
        snapshot: {
          name: product.name,
          price: product.price,
          image: product.image,
          brands: product.brands,
          state_product: product.state_product,
          type_product: product.type_product,
        },
      },
      method_pay: method_pay,
      address,
    });

    await newCart.save();
    return res
      .status(200)
      .json({ message: "Thêm sản phẩm vào giỏ thành công", newCart });
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ:", error);
    return res
      .status(500)
      .json({ message: "Không thể thêm sản phẩm vào giỏ!", error });
  }
};

export const addToOrder = async (req: Request, res: Response) => {
  try {
    const cart_id = new mongoose.Types.ObjectId(req.params.cart_id);

    const checkoutOrder = await Order.findByIdAndUpdate(cart_id, {
      state_order: "paid",
    });

    if (checkoutOrder) {
      return res
        .status(200)
        .json({ message: "Đơn hàng đã thanh toán:", paid_cart: checkoutOrder });
    } else {
      return res.status(401).json({ message: "Không tìm thấy đơn hàng!" });
    }
  } catch (error) {
    return res.status(404).json({ message: "Không thể thanh toán đơn hàng!" });
  }
};

export const getOrderForUser = async (req: Request, res: Response) => {
  try {
    const user_id = new mongoose.Types.ObjectId(req.params.user_id);
    const orders = await Order.find({
      users: user_id,
      $or: [{ state_order: "wait_checking" }, { state_order: "paid" }],
    });
    res.status(200).json({ message: "Đơn hàng của bạn:", my_order: orders });
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng đã thanh toán:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

//lấy đơn hàng cho seller xác nhận
export const getOrderForSeller = async (req: Request, res: Response) => {
  try {
    const seller_id = new mongoose.Types.ObjectId(req.params.seller_id);
    const orders = await Order.find({
      state_order: "wait_checking",
    })
      .populate({
        path: "product_items.product_id",
        match: { seller_id: seller_id },
      })
      .populate({
        path: "users",
        model: "Account",
        select: "name phone email",
      });
    if (orders.length == 0) {
      return res
        .status(401)
        .json({ message: "Chưa có đơn hàng nào cần xác nhận" });
    }
    res.status(200).json({ message: "Đơn hàng của bạn:", my_order: orders });
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng đã thanh toán:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

//submit Order
export const confirmOrder = async (req: Request, res: Response) => {
  try {
    const order_id = new mongoose.Types.ObjectId(req.params.order_id);
    const orders = await Order.findByIdAndUpdate(order_id, {
      state_order: "paid",
      shipping_status: "wait_shipping",
    });
    return res.status(200).json({ message: "Đơn hàng của bạn:", orders });
  } catch (error) {
    return res.status(404).json({ message: "Không xác nhận được đơn hàng" });
  }
};

//lay don hang da duoc dat va thanh toan
export const getOrderConfirm = async (req: Request, res: Response) => {
  try {
    const seller_id = new mongoose.Types.ObjectId(req.params.seller_id);
    const orders = await Order.find({
      $and: [
        {
          state_order: "paid",
          shipping_status: "wait_shipping",
        },
      ],
    })
      .populate({
        path: "product_items.product_id",
        match: { seller_id: seller_id },
      })
      .populate({
        path: "users",
        model: "Account",
        select: "fullname phone email",
      });
    if (orders.length == 0) {
      return res
        .status(401)
        .json({ message: "Chưa có đơn hàng nào cần xác nhận" });
    }
    res.status(200).json({ message: "Đơn hàng của bạn:", my_order: orders });
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng đã thanh toán:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
