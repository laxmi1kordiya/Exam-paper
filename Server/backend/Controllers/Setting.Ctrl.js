import { ApiResponse } from "../Helpers/common.js";
import {
  create,
  deleteOne,
  find,
  findAllData,
  findOneAndUpdate,
} from "../Model/common.js";

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
    if (body._id) {
      rcResponse.data = await findOneAndUpdate(
        "board",
        { _id: body._id },
        body
      );
    } else {
      rcResponse.data = await create("board", body);
    }
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};
export const deleteBoardData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { id } = req.params;
  try {
    rcResponse.data = await deleteOne("board", { _id: id });
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const deleteStandardData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { id } = req.params;
  try {
    rcResponse.data = await deleteOne("standard", { _id: id });
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const deleteSemesterData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { id } = req.params;
  try {
    rcResponse.data = await deleteOne("semester", { _id: id });
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const deleteSubjectData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { id } = req.params;
  try {
    rcResponse.data = await deleteOne("subject", { _id: id });
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const deleteChapterData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { id } = req.params;
  try {
    rcResponse.data = await deleteOne("chapter", { _id: id });
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

export const addSaveData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { body } = req;
  try {
    rcResponse.data = await create("paperSetting", body);
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};
