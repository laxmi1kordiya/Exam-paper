import { ApiResponse } from "../Helpers/common.js";
import { find } from "../Model/common.js";

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