import { Router } from "express";
import { getStdData, getSemData, getSubData, getBoardData } from "../Controllers/Setting.Ctrl.js";

const settingRoutes = Router();
settingRoutes.get("/getBoardData", getBoardData);
settingRoutes.get("/getStdData", getStdData);
settingRoutes.get("/getSemData", getSemData);
settingRoutes.get("/getSubData", getSubData);
export default settingRoutes;