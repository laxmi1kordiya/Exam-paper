import { Router } from "express";
import signUpRoutes from "./SignUpRoutes.js";
import settingRoutes from "./SettingRoutes.js";

const router = Router();
router.use(signUpRoutes);
router.use(settingRoutes);

export default router;
