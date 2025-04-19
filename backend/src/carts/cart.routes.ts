import express from "express";
import { getCart, getOrdersBySeller } from "./cart.controller";

const cartRouter = express.Router();

//HTTP method
cartRouter.get("/get_cart/:userId", async (req, res) => {
  await getCart(req, res);
});
cartRouter.get("/seller/:sellerId", async (req, res) => {
  await getOrdersBySeller(req, res);
});
export default cartRouter;
