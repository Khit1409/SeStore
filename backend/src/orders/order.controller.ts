import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../models/Order";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { attributes, quantity, address, userId } = req.body;
    const productId = new mongoose.Types.ObjectId(req.params.productId);

    // Tìm đơn hàng cũ của người dùng
    const newCart = new Order({
      users: userId,
      productItems: [
        {
          productId: productId,
          quantity: quantity,
          attributes: attributes,
        },
      ],
      address: address,
      totalProduct: 1,
    });

    if (!newCart) {
      return res.status(404).json({ message: "cannot create new cart:" });
    }
    await newCart.save();
    return res.status(200).json({ message: "New cart", newCart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Không thể thêm sản phẩm vào giỏ!", error });
  }
};
