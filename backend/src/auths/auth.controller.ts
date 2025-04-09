import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import Account from "../models/Account";
import bcrypt from "bcrypt";
import { handlePassword, verifyToken } from "./auth.middleware";
// import { handlePassword } from "./auth.middleware";

// Check Auth
export const checkAuth = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    //verify token
    const decoded = verifyToken(req, res, token);

    return res.status(200).json({ message: "Token valid!", decoded, token });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired!" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token is not valid!" });
    } else {
      return res
        .status(500)
        .json({ message: "Error checking authentication", error });
    }
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
        address: account.address,
        phone: account.phone,
        birthday: account.birthday,
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
      .json({ message: "Sign successful", user: account });
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
      birthday,
      address,
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
      birthday,
      address,
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
      return res.status(401).json({ message: "Cant get token~~!" });
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
