import { Request, Response } from "express";
import { payos } from "../../server";
import Order from "../models/Order";

export const createPaymentLink = async (req: Request, res: Response) => {
  try {
    const amount = req.body.amount;
    const orderCode = req.body.orderCode;
    const order = {
      amount: amount,
      description: `Thanh toán đơn hàng!`,
      status: "PAID",
      orderCode: orderCode,
      returnUrl: "http://localhost:5173/user/my_order",
      cancelUrl: "http://localhost:5173/user/my_cart",
    };

    const paymentLink = await payos.createPaymentLink(order);
    return res.status(200).json({ checkoutUrl: paymentLink.checkoutUrl });
  } catch (error) {
    console.error("Payment link creation error:", error);
    return res.status(500).json({ message: "Lỗi tạo link thanh toán" });
  }
};

export const webHook = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log("Dữ liệu webhook nhận được từ PayOS:", data); // Log dữ liệu nhận được từ webhook

    if (data.status === "PAID") {
      // Cập nhật trạng thái đơn hàng thành 'paid'
      await Order.findOneAndUpdate(
        { orderCode: data.orderCode }, // Tìm đơn hàng theo orderCode
        { state_order: "paid" } // Cập nhật trạng thái đơn hàng
      );
      console.log(`Đơn hàng ${data.orderCode} đã thanh toán thành công!`);
    }

    // Trả về mã 200 để thông báo đã nhận dữ liệu thành công
    res.status(200).json({ message: "Webhook received" });
  } catch (error) {
    console.error("Lỗi khi xử lý webhook:", error);
    res.status(500).json({ message: "Lỗi xử lý webhook", error });
  }
};