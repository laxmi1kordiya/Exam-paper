import { Router } from "express";
import {
  addLoginData,
  addSignUpData,
  getUserData,
  verifyData,
} from "../Controllers/SingUp.Ctrl.js";

const signUpRoutes = Router();

signUpRoutes.post("/signUp", addSignUpData);
signUpRoutes.post("/login", addLoginData);
signUpRoutes.post("/verify", verifyData);
signUpRoutes.get("/getUserData", getUserData);

export default signUpRoutes;
