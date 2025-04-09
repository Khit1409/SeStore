import express, { Request, Response } from "express";
import {
  checkAuth,
  postLogin,
  postLogout,
  postRegister,
} from "./auth.controller";
const authRoutes = express.Router();

//check auth routes
authRoutes.get("/check", async (req: Request, res: Response) => {
  try {
    await checkAuth(req, res);
  } catch (error) {
    res.status(500).json({ message: "check auth error!" });
  }
});
//login routes
authRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    await postLogin(req, res);
  } catch (error) {
    res.status(500).json({ message: "login error!" });
  }
});
//register
authRoutes.post("/register", async (req: Request, res: Response) => {
  try {
    await postRegister(req, res);
  } catch (error) {
    res.status(404).json({ message: "routes error!" });
  }
});
//logout routes
authRoutes.post("/logout", async (req: Request, res: Response) => {
  try {
    await postLogout(req, res);
  } catch (error) {
    console.error("Backend cannot logout!", error);
    res.status(500).json({ message: "Canot logout be!", error });
  }
});

export default authRoutes;
