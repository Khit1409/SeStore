import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../models/Order";
import Product from "../models/Product";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { attributes, quantity, address, userId, methodPay } = req.body;
    const productId = new mongoose.Types.ObjectId(req.params.productId);

    // Tìm sản phẩm trong collection Product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    const newCart = new Order({
      users: userId,
      productItems: [
        {
          productId: product._id,
          quantity,
          attributes,
          snapshot: {
            name: product.name,
            price: product.price,
            image: product.image,
            brands: product.brands,
            stateProduct: product.stateProduct,
            typeProduct: product.typeProduct,
          },
        },
      ],
      product_detail: {
        productId: product._id,
        quantity,
        attributes,
        snapshot: {
          name: product.name,
          price: product.price,
          image: product.image,
          brands: product.brands,
          stateProduct: product.stateProduct,
          typeProduct: product.typeProduct,
        },
      },
      methodPay: methodPay,
      address,
      totalProduct: 1,
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
