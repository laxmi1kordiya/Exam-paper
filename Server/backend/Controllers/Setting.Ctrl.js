import { ApiResponse } from "../Helpers/common.js";
import { create, find, findAllData } from "../Model/common.js";

export const getBoardData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  try {
    rcResponse.data = await find("board", {});
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};
export const getStdData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  try {
    rcResponse.data = await find("standard", {});
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const getSemData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  try {
    rcResponse.data = await find("semester", {});
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const getSubData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  try {
    rcResponse.data = await find("subject", {});
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const getChapterData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  try {
    rcResponse.data = await find("chapter", {});
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const getAllData = async (req, res, next) => {
  try {
    const rcResponse = new ApiResponse();
    rcResponse.data = await findAllData("board");
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const addBoardData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { body } = req;
  try {
    rcResponse.data = await create("board", body);
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const addStandardData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { body } = req;
  try {
    rcResponse.data = await create("standard", body);
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const addSemesterData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { body } = req;
  try {
    rcResponse.data = await create("semester", body);
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const addSubjectData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { body } = req;
  try {
    rcResponse.data = await create("subject", body);
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const addChapterData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { body } = req;
  try {
    rcResponse.data = await create("chapter", body);
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};
