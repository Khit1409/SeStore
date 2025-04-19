import mongoose from "mongoose";
import Product from "../models/Product";
import { Request, Response } from "express";

//lấy sản phẩm
export const getProductForSeller = async (req: Request, res: Response) => {
  try {
    const sellerIdQuery = req.params.sellerId as string;
    if (!mongoose.Types.ObjectId.isValid(sellerIdQuery)) {
      return res.status(400).json({ message: "Invalid sellerId" });
    }
    const sellerId = new mongoose.Types.ObjectId(sellerIdQuery);
    // Chuyển sellerId thành ObjectId
    const type = req.query.type as string;
    const limit = parseInt(req.query.limit as string) || 8;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (type && type !== "") {
      filter.type = type;
    }
    if (sellerId) {
      filter.sellerId = sellerId;
    }
    const products = await Product.find(filter).skip(skip).limit(limit);

    if (products.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    return res
      .status(200)
      .json({ message: "Sản phẩm được tìm thấy", product: products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Cannot get products", error });
  }
};
// lấy sản phẩm cho user
export const getProductForUser = async (req: Request, res: Response) => {
  try {
    const type = req.query.type as string;
    const stateProduct = req.query.stateProduct as string;
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);
    const price = parseInt(req.query.price as string);
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (type && type !== "all") {
      filter.typeProduct = type;
    }
    if (stateProduct && stateProduct !== "all") {
      filter.stateProduct = stateProduct;
    }
    if (!isNaN(price)) {
      if (price > 100000) {
        filter.price = { $gt: 1000000 };
      } else {
        filter.price = { $gte: 0, $lte: price };
      }
    }

    const products = await Product.find(filter).skip(skip).limit(limit);

    if (products.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    return res
      .status(200)
      .json({ message: "Sản phẩm được tìm thấy", product: products });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Can not get product for user! Server error" });
  }
};
//Lấy sản phẩm cho order
export const getProductForDetail = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    if (productId) {
      const responseProduct = await Product.findById(productId);
      if (!responseProduct) {
        return res.status(404).json({ message: "Can not find this product!" });
      }
      return res
        .status(200)
        .json({ message: "Product:", product: responseProduct });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Can not get product for order", error });
  }
};
//tạo sản phẩm
export const createProducts = async (req: Request, res: Response) => {
  try {
    const {
      name,
      price,
      image,
      description,
      brands,
      attributes,
      stateProduct,
      typeProduct,
    } = req.body;
    const newProduct = new Product({
      name,
      price,
      image,
      description,
      brands,
      attributes,
      stateProduct,
      typeProduct,
    });

    if (!newProduct) {
      return res.status(401).json({ message: "Can not create new data!" });
    }
    await newProduct.save();
    res
      .status(200)
      .json({ message: "Create product successfull!", product: newProduct });
  } catch (error) {
    res.status(404).json({ message: "Can not create product!" });
  }
};
//xóa sản phẩm
export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const sellerId = new mongoose.Types.ObjectId(req.body.sellerId as string);
    const productId = new mongoose.Types.ObjectId(
      req.body.productId as string
    );
    const deletedProduct = await Product.findByIdAndDelete({
      _id: productId,
      sellerId: sellerId,
    });
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để xoá." });
    }
    const remainingProducts = await Product.find({ sellerId: sellerId });
    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
      reRender: remainingProducts,
    });
  } catch (error) {
    console.error("Lỗi xoá sản phẩm:", error);
    return res.status(500).json({ message: "Không thể xóa sản phẩm" });
  }
};
