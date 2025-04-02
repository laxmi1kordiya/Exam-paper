import { Router } from "express";
// import userRoutes from "../../routes/index.js";
import signUpRoutes from "./SignUpRoutes.js";

const router = Router();
// router.use(userRoutes);
router.use(signUpRoutes);

export default router;
