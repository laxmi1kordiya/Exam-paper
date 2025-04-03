import { ApiResponse } from "../Helpers/common.js";
import { create } from "../Model/common.js";

export const addSignUpData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { body } = req;
  try {
    rcResponse.data = await create("signUp", body);
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};
