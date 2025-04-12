import Product from "../models/Product";
import { Request, Response } from "express";

//lấy sản phẩm
export const getProducts = async (req: Request, res: Response) => {
  try {
    const type = req.params.type;
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    if (!type) {
      return res.status(401).json({ message: "Dont know type products!" });
    }
    const skip = (page - 1) * limit;
    const product = await Product.find({ typeProduct: type })
      .skip(skip)
      .limit(limit);
    if (!product) {
      return res.status(401).json({ message: "Product not found!" });
    }
    res.status(200).json({ message: "Sản phẩm:", product });
  } catch (error) {
    return res.status(401).json({ message: "Cannot get products" });
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
// //cập nhật sản phẩm
// export const updateProducts = async (req: Request, res: Response) => {};
// //xóa sản phẩm
// export const deleteProducts = async (req: Request, res: Response) => {};
