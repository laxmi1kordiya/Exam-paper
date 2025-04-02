import { Router } from "express";
import { addSignUpData } from "../Controllers/SingUp.Ctrl.js";

const signUpRoutes = Router();
signUpRoutes.post("/signUp", addSignUpData);


export default signUpRoutes;
