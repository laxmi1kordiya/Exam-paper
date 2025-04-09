import { Router } from "express";
import { getStdData, getSemData, getSubData, getBoardData, getAllData } from "../Controllers/Setting.Ctrl.js";

const settingRoutes = Router();
settingRoutes.get("/getBoardData", getBoardData);
settingRoutes.get("/getStdData", getStdData);
settingRoutes.get("/getSemData", getSemData);
settingRoutes.get("/getSubData", getSubData);
settingRoutes.get("/getAllData", getAllData);

export default settingRoutes;