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
  deleteBoardData,
  deleteStandardData,
  deleteSemesterData,
  deleteSubjectData,
  deleteChapterData,
  getQuestions,
  addQuestionData,
  deleteQuestionData,
  getHeaderData,
  deleteOneQuestion,
  addPaperData
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
settingRoutes.delete("/deleteStandardData/:id", deleteStandardData);
settingRoutes.delete("/deleteSemesterData/:id", deleteSemesterData);
settingRoutes.delete("/deleteSubjectData/:id", deleteSubjectData);
settingRoutes.delete("/deleteChapterData/:id", deleteChapterData);
settingRoutes.post("/addStandardData", addStandardData);
settingRoutes.post("/addSemesterData", addSemesterData);
settingRoutes.post("/addSubjectData", addSubjectData);
settingRoutes.post("/addChapterData", addChapterData);
settingRoutes.post("/paperSetting", addSaveData);
settingRoutes.get("/getQuestions", getQuestions);
settingRoutes.get("/getQuestionData", getQuestions);
settingRoutes.post("/addQuestionData", addQuestionData);
settingRoutes.delete("/deleteQuestionData/:id", deleteQuestionData);
settingRoutes.get("/getHeaderData", getHeaderData);
settingRoutes.delete('/deleteOneQuestion/:id/:q_id', deleteOneQuestion);
settingRoutes.post('/addPaper', addPaperData);


export default settingRoutes;