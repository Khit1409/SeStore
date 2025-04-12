import express, { Request, Response } from "express";
import {
  createProducts,
  // deleteProducts,
  getProducts,
  // updateProducts,
} from "./products.controller";

const productRouter = express.Router();

//HTTP method
productRouter.get("/:type", async (req, res) => {
  await getProducts(req, res);
});
productRouter.post(
  "/:type",
  async (req, res) => {await createProducts(req, res)}
);
// productRouter.put(
//   "/:productId",
//   async (req, res) => {await updateProducts(req, res)}
// );
// productRouter.delete(
//   "/:productId",
//   async (req, res) => {await deleteProducts(req, res)}
// );

export default productRouter;
