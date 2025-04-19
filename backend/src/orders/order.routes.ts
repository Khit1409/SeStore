import express from "express";
import { addToCart } from "./order.controller";
const orderRouter = express.Router();

orderRouter.post("/addtocart/:productId", async (req, res) => {
  await addToCart(req, res);
});

export default orderRouter;
