import { Router } from "express";
import { addLoginData, addSignUpData } from "../Controllers/SingUp.Ctrl.js";

const signUpRoutes = Router();

signUpRoutes.post("/signUp", addSignUpData);
signUpRoutes.post("/login", addLoginData);

export default signUpRoutes;
