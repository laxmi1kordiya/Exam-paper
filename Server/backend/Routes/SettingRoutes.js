import { Router } from "express";
import { getAllData } from "../Controllers/Setting.Ctrl.js";

const settingRoutes = Router();
settingRoutes.get("/getAllData", getAllData);

export default settingRoutes;