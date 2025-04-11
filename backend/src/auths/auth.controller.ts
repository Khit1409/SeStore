import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import Account from "../models/Account";
import bcrypt from "bcrypt";
import { handlePassword } from "./auth.middleware";
// import { handlePassword } from "./auth.middleware";

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "KHÔNG TÌM THẤY TOKEN (HẾT HẠN HOẶC CHƯA ĐĂNG NHẬP)",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JwtPayload;

    // Nếu decode không có accountId thì coi như không hợp lệ
    if (!decoded || !decoded.accountId) {
      return res.status(401).json({ message: "Token không hợp lệ!" });
    }

    return res.status(200).json({ message: "Token valid!", decoded, token });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token đã hết hạn!" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token sai định dạng!" });
    }
    return res
      .status(500)
      .json({ message: "Không thể check phiên đăng nhập", error });
  }
};

//
//login
export const postLogin = async (req: Request, res: Response) => {
  try {
    // get value from client
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "email or password is undefine~~!" });
    }
    //find account
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(401).json({ message: "Cant find account~~!" });
    }
    //check account
    const check = await bcrypt.compare(password, account.password);
    if (!check) {
      return res.status(401).json({ message: "password not match!" });
    }
    // create token
    const token = jwt.sign(
      {
        accountId: account._id,
        avatar: account.avatar,
        fullname: account.fullname,
        phone: account.phone,
        email: account.email,
        role: account.role,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    //return data
    return res
      .cookie("token", token, {
        httpOnly: true, // Không cho phép truy cập cookie từ client-side JS
        secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua HTTPS trong môi trường production
        sameSite: "strict", // Chỉ gửi cookie trong cùng domain
        maxAge: 24 * 60 * 60 * 1000, // Token có thời gian sống 1 ngày
      })
      .status(200)
      .json({ message: "ĐĂNG NHẬP THÀNH CÔNG: ", user: account });
  } catch (error) {
    res.status(404).json({ message: "Cannot login!", error });
  }
};
//register
export const postRegister = async (req: Request, res: Response) => {
  try {
    const {
      fullname,
      email,
      password,
      repassword,
      phone,
      avatar,
      role,
    } = req.body;

    const checkaccount = await Account.findOne({ email });
    if (checkaccount) {
      return res.status(401).json({ message: "Email này đã được dùng!" });
    }
    //middleware
    const hashPass = await handlePassword(req, res, password, repassword);
    //create account
    const newAccount = new Account({
      fullname,
      email,
      password: hashPass,
      avatar: avatar,
      phone,
      role: role,
    });

    //save
    await newAccount.save();
    return res
      .status(200)
      .json({ message: "Đăng ký tài khoản thành công!", account: newAccount });
  } catch (error) {
    return res.status(404).json({ message: "Không thể đăng ký", error });
  }
};
//logout
export const postLogout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "TOKEN KHÔNG TỒN TẠI" });
    }
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true, // Xóa cookie
        secure: process.env.NODE_ENV === "production", // Xóa cookie qua HTTPS trong môi trường production
        sameSite: "strict",
      })
      .json({ message: "Logout successful!" });
  } catch (error) {
    return res.status(404).json({ message: "Cannot logout~~~!", error });
  }
};
