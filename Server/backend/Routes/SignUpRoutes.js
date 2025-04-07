import { Router } from "express";
import { addLoginData, addSignUpData ,verifyData} from "../Controllers/SingUp.Ctrl.js";

const signUpRoutes = Router();

signUpRoutes.post("/signUp", addSignUpData);
signUpRoutes.post("/login", addLoginData);
signUpRoutes.post("/verify", verifyData);

export default signUpRoutes;
