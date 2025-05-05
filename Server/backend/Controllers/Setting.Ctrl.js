import { ApiResponse } from "../Helpers/common.js";
import {
  create,
  deleteOne,
  find,
  findAllData,
  findOne,
  findOneAndUpdate,
  deleteFromArray,
} from "../Model/common.js";

export const getAllData = async (req, res, next) => {
  try {
    const rcResponse = new ApiResponse();
    rcResponse.data = await findAllData("board");
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

const handleGetAll = (modelName) => async (req, res, next) => {
  const rcResponse = new ApiResponse();
  try {
    rcResponse.data = await find(modelName, {});
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const getBoardData = handleGetAll("board");
export const getStdData = handleGetAll("standard");
export const getSubData = handleGetAll("subject");
export const getChapterData = handleGetAll("chapter");
export const getQuestions = handleGetAll("Question");
export const getPaperData = handleGetAll("paper");

const handleDelete = (modelName) => async (req, res, next) => {
  const rcResponse = new ApiResponse();
  const { id } = req.params;

  try {
    rcResponse.data = await deleteOne(modelName, { _id: id });
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};
export const getHeaderData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  try {
    rcResponse.data = await findOne("paperSetting", {});
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const deleteBoardData = handleDelete("board");
export const deleteStandardData = handleDelete("standard");
export const deleteSubjectData = handleDelete("subject");
export const deleteChapterData = handleDelete("chapter");
export const deleteQuestionData = handleDelete("Question");
export const deletePaperData = handleDelete("paper");

const handleCreateOrUpdate = (modelName) => async (req, res, next) => {
  const rcResponse = new ApiResponse();
  const { body } = req;

  try {
    if (body._id) {
      rcResponse.data = await findOneAndUpdate(
        modelName,
        { _id: body._id },
        body
      );
    } else {
      rcResponse.data = await create(modelName, body);
    }

    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};
export const addBoardData = handleCreateOrUpdate("board");
export const addStandardData = handleCreateOrUpdate("standard");
export const addSubjectData = handleCreateOrUpdate("subject");
export const addChapterData = handleCreateOrUpdate("chapter");
export const addQuestionData = handleCreateOrUpdate("Question");
export const addSaveData = handleCreateOrUpdate("paperSetting");
export const addPaperData = handleCreateOrUpdate("paper");

export const deleteOneQuestion = async (req, res, next) => {
  const rcResponse = new ApiResponse();
  const { id, q_id } = req.params;

  try {
    rcResponse.data = await deleteFromArray(
      "Question",
      { _id: id },
      { questionList: { q_id: q_id } }
    );
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    console.log(err, '"err--"');
    next(err);
  }
};

