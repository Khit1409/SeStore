import express from "express";
import {
  createProducts,
  deleteProducts,
  getProductForDetail,
  getProductForSeller,
  getProductForUser,
} from "./products.controller";

const productRouter = express.Router();

//HTTP method
productRouter.get("/:sellerId", async (req, res) => {
  await getProductForSeller(req, res);
});

productRouter.get("/detail/:productId", async (req, res) => {
  await getProductForDetail(req, res);
});

productRouter.get("/", async (req, res) => {
  await getProductForUser(req, res);
});
productRouter.post("/delete", async (req, res) => {
  await deleteProducts(req, res);
});
productRouter.post("/:type", async (req, res) => {
  await createProducts(req, res);
});

export default productRouter;
