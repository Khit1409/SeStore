import express from "express";
import {
  checkAuth,
  postLogin,
  postLogout,
  postRegister,
} from "./auth.controller";
const authRoutes = express.Router();

//check auth routes
authRoutes.get("/check", async (req, res) => {
  await checkAuth(req, res);
});

//login routes
authRoutes.post("/login", async (req, res) => {
  await postLogin(req, res);
});
//register
authRoutes.post("/register", async (req, res) => {
  await postRegister(req, res);
});
//logout routes
authRoutes.post("/logout", async (req, res) => {
  await postLogout(req, res);
});

export default authRoutes;
