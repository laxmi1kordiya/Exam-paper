import { Router } from "express";
import {
  getStdData,
  getSemData,
  getSubData,
  getBoardData,
  getChapterData,
  getAllData,
  addBoardData,
  addStandardData,
  addSemesterData,
  addSubjectData,
  addChapterData,
  addSaveData,
  deleteBoardData
} from "../Controllers/Setting.Ctrl.js";

const settingRoutes = Router();
settingRoutes.get("/getBoardData", getBoardData);
settingRoutes.get("/getStdData", getStdData);
settingRoutes.get("/getSemData", getSemData);
settingRoutes.get("/getSubData", getSubData);
settingRoutes.get("/getChapterData", getChapterData);
settingRoutes.get("/getAllData", getAllData);
settingRoutes.post("/addBoardData", addBoardData);
settingRoutes.delete("/deleteBoardData/:id", deleteBoardData);
settingRoutes.post("/addStandardData", addStandardData);
settingRoutes.post("/addSemesterData", addSemesterData);
settingRoutes.post("/addSubjectData", addSubjectData);
settingRoutes.post("/addChapterData", addChapterData);
settingRoutes.post("/addSaveData", addSaveData);

export default settingRoutes;