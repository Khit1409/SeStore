import express from "express";
import { createPaymentLink, webHook } from "./payment.controller";
const paymentRoutes = express.Router();

paymentRoutes.post("/create-payment-link", async (req, res) => {
  await createPaymentLink(req, res);
});

//https://7dd6-2402-800-623d-ecc6-39a0-3872-be81-3098.ngrok-free.app/receive-hook
paymentRoutes.post("/receive-hook", async (req, res) => {
  await webHook(req, res);
});

export default paymentRoutes;
