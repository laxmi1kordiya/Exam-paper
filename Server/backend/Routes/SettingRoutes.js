import { Router } from "express";
import {
  getStdData,
  getSubData,
  getBoardData,
  getChapterData,
  getAllData,
  addBoardData,
  addStandardData,
  addSubjectData,
  addChapterData,
  addSaveData,
  deleteBoardData,
  deleteStandardData,
  deleteSubjectData,
  deleteChapterData,
  getQuestions,
  addQuestionData,
  deleteQuestionData,
  getHeaderData,
  deleteOneQuestion,
  addPaperData,
  getPaperData,
  deletePaperData,
  addSyllabusData,
  deleteOneTopic
} from "../Controllers/Setting.Ctrl.js";

const settingRoutes = Router();
settingRoutes.get("/getBoardData", getBoardData);
settingRoutes.get("/getStdData", getStdData);
settingRoutes.get("/getSubData", getSubData);
settingRoutes.get("/getChapterData", getChapterData);
settingRoutes.get("/getAllData", getAllData);
settingRoutes.post("/addBoardData", addBoardData);
settingRoutes.delete("/deleteBoardData/:id", deleteBoardData);
settingRoutes.delete("/deleteStandardData/:id", deleteStandardData);
settingRoutes.delete("/deleteSubjectData/:id", deleteSubjectData);
settingRoutes.delete("/deleteChapterData/:id", deleteChapterData);
settingRoutes.post("/addStandardData", addStandardData);
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
settingRoutes.get('/getMyPapers', getPaperData);
settingRoutes.delete('/deleteMyPapers/:id', deletePaperData);
settingRoutes.post('/addSyllabusData', addSyllabusData);
settingRoutes.delete("/deleteOneTopic/:id", deleteOneTopic);


export default settingRoutes;