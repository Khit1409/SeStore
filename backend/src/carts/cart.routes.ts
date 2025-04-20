import express from "express";
import {
  getCart,
  getCartForDetail,
  getOrdersBySeller,
} from "./cart.controller";

const cartRouter = express.Router();

//HTTP method
cartRouter.get("/get_cart/:userId", async (req, res) => {
  await getCart(req, res);
});
cartRouter.get("/seller/:sellerId", async (req, res) => {
  await getOrdersBySeller(req, res);
});
cartRouter.get("/payment/:cart_id", async (req, res) => {
  await getCartForDetail(req, res);
});
cartRouter.post("/cancel/:cart_id", async (req, res) => {
  // await getCart(req, res);
});
export default cartRouter;
