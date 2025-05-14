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
  deleteBoardData,
  deleteStandardData,
  deleteSubjectData,
  deleteChapterData,
  getQuestions,
  addQuestionData,
  deleteOneQuestion,
  addPaperData,
  getPaperData,
  deletePaperData,
  addSyllabusData,
  deleteOneTopic,
  getSyllabusData
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
settingRoutes.get("/getQuestions", getQuestions);
settingRoutes.get("/getQuestionData", getQuestions);
settingRoutes.post("/addQuestionData", addQuestionData);
settingRoutes.delete('/deleteOneQuestion/:id/:q_id', deleteOneQuestion);
settingRoutes.post('/addPaper', addPaperData);
settingRoutes.get('/getMyPapers', getPaperData);
settingRoutes.delete('/deleteMyPapers/:id', deletePaperData);
settingRoutes.post('/addSyllabusData', addSyllabusData);
settingRoutes.delete("/deleteOneTopic/:id", deleteOneTopic);
settingRoutes.post('/getSyllabusData', getSyllabusData);


export default settingRoutes;