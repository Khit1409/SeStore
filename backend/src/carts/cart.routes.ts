import express from "express";
import {
  cancelCart,
  getCart,
  getCartForDetail,
} from "./cart.controller";

const cartRouter = express.Router();

//HTTP method
cartRouter.get("/get_cart/:user_id", async (req, res) => {
  await getCart(req, res);
});
cartRouter.get("/payment/:cart_id", async (req, res) => {
  await getCartForDetail(req, res);
});
cartRouter.delete("/cancel/:user_id/:cart_id", async (req, res) => {
  await cancelCart(req, res);
});
export default cartRouter;
