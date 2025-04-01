import { Router } from "express";
import { addSignUpData } from "../Controllers/SingUP.Ctrl";

const signUpRoutes = Router();
signUpRoutes.post("/signUp", addSignUpData);


export default signUpRoutes;
