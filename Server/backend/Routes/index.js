import { Router } from "express";
import signUpRoutes from "./SignUpRoutes.js";

const router = Router();
router.use(signUpRoutes);

export default router;
