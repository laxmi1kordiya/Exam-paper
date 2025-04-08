import { ApiResponse } from "../Helpers/common.js";
import { find } from "../Model/common.js";

export const getAllData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  try {
    rcResponse.data = await find("standard", {});
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};
