import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

//hash password
export const handlePassword = async (
  req: Request,
  res: Response,
  password: string,
  repassword: string
) => {
  try {
    if (password != repassword) {
      return res.status(401).json({ message: "Pass and Repass not match!" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    return hashPass;
  } catch (error) {
    res.status(404).json({ message: "HandlePassword have error:", error });
  }
};

//verifyToken
