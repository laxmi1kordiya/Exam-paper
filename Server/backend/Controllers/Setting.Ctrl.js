import { ApiResponse } from "../Helpers/common.js";
import { find } from "../Model/common.js";

export const getAllData = async ( res, next) => {
  let rcResponse = new ApiResponse();
  try {
    console.log("run---")
    rcResponse.data = await find("Standard", {});
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};
