import express from "express";
import {
  addToCart,
  addToOrder,
  confirmOrder,
  getOrderConfirm,
  getOrderForSeller,
  getOrderForUser,
} from "./order.controller";
const orderRouter = express.Router();

orderRouter.get("/get_order/:user_id", async (req, res) => {
  await getOrderForUser(req, res);
});
orderRouter.get("/get_order_to_seller/:seller_id", async (req, res) => {
  await getOrderForSeller(req, res);
});
orderRouter.post("/addtocart/:product_id", async (req, res) => {
  await addToCart(req, res);
});
orderRouter.put("/checkout_order/:cart_id", async (req, res) => {
  await addToOrder(req, res);
});
orderRouter.put("/submit/:order_id", async (req, res) => {
  await confirmOrder(req, res);
});
orderRouter.get("/seller_order/:seller_id", async (req, res) => {
  await getOrderConfirm(req, res);
});

export default orderRouter;
