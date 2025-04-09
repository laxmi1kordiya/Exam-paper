import { Router } from "express";
import {
  getStdData,
  getSemData,
  getSubData,
  getBoardData,
  getAllData,
  addBoardData,
} from "../Controllers/Setting.Ctrl.js";

const settingRoutes = Router();
settingRoutes.get("/getBoardData", getBoardData);
settingRoutes.get("/getStdData", getStdData);
settingRoutes.get("/getSemData", getSemData);
settingRoutes.get("/getSubData", getSubData);
settingRoutes.get("/getAllData", getAllData);
settingRoutes.post("/addBoardData", addBoardData);

export default settingRoutes;