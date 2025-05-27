import { ApiResponse } from "../Helpers/common.js";
import { create, findOneAndUpdate, findOne } from "../Model/common.js";

export const addSignUpData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { body } = req;
  try {
    rcResponse.data = await create("user", body);
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const addLoginData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  let { body } = req;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const otpExpiresAt = new Date(Date.now() + 1 * 60 * 1000); // expires in 1 minutes
  // const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 minutes
  try {
    rcResponse.data = await findOneAndUpdate(
      "user",
      { mobile: body.mobile },
      { otp, otpExpiresAt}
    );
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const verifyData = async (req, res, next) => {
  const rcResponse = new ApiResponse();
  const { mobile, otp } = req.body;
  try {
    let user = await findOne("user", { mobile, otp });
    if (!user.otpExpiresAt || new Date() > new Date(user.otpExpiresAt)) {
      user = await findOneAndUpdate("user", { mobile }, { otp: null, otpExpiresAt: null });
    }
    rcResponse.data = user;
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};

export const getUserData = async (req, res, next) => {
  let rcResponse = new ApiResponse();
  try {
    rcResponse.data = await findOne("user", {});
    return res.status(rcResponse.code).send(rcResponse);
  } catch (err) {
    next(err);
  }
};
