import mongoose from "mongoose";
import Product from "../models/Product";
import { Request, Response } from "express";

//lấy sản phẩm
export const getProductForSeller = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const type_product = req.query.type_product as string;
    const limit = parseInt(req.query.limit as string) || 8;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const seller_id = new mongoose.Types.ObjectId(req.params.seller_id);
    if (!mongoose.Types.ObjectId.isValid(seller_id)) {
      return res.status(400).json({ message: "Invalid sellerId" });
    }

    const filter: any = {};
    if (type_product && type_product !== "") {
      filter.type_product = type_product;
    }
    if (seller_id) {
      filter.seller_id = seller_id;
    }
    const products = await Product.find({
      name: { $regex: search, $options: "i" },
      ...filter,
    })
      .skip(skip)
      .limit(limit);

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
    const search = req.query.search as string;
    const state_product = req.query.state_product as string;
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);
    const price = parseInt(req.query.price as string);
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (type && type !== "all") {
      filter.type_product = type;
    }
    if (state_product && state_product !== "all") {
      filter.state_product = state_product;
    }
    if (!isNaN(price)) {
      if (price > 100000) {
        filter.price = { $gt: 1000000 };
      } else {
        filter.price = { $gte: 0, $lte: price };
      }
    }

    const products = await Product.find({
      name: { $regex: search, $options: "i" },
      ...filter,
    })
      .skip(skip)
      .limit(limit);

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
    const product_id = req.params.product_id;
    if (product_id) {
      const response_product = await Product.findById(product_id);
      if (!response_product) {
        return res.status(404).json({ message: "Can not find this product!" });
      }
      return res
        .status(200)
        .json({ message: "Product:", product: response_product });
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
      state_product,
      type_product,
    } = req.body;
    const newProduct = new Product({
      name,
      price,
      image,
      description,
      brands,
      attributes,
      state_product,
      type_product,
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
    const seller_id = new mongoose.Types.ObjectId(req.body.seller_id as string);
    const product_id = new mongoose.Types.ObjectId(req.body.product_id as string);
    const deleted_product = await Product.findByIdAndDelete({
      _id: product_id,
      sellerId: seller_id,
    });
    if (!deleted_product) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để xoá." });
    }
    const remainingProducts = await Product.find({ sellerId: seller_id });
    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
      reRender: remainingProducts,
    });
  } catch (error) {
    console.error("Lỗi xoá sản phẩm:", error);
    return res.status(500).json({ message: "Không thể xóa sản phẩm" });
  }
};
