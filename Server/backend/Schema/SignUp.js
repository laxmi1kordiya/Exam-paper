import mongoose from "mongoose";

const Schema = mongoose.Schema;

const signUpSchema = new Schema({
  name: { type: String ,required: true},
  mobile: { type: String, unique: true, required: true },
  district: { type: String ,required: true},
  address: { type: String ,required: true},
  type: { type: String  ,required: true},
  gender : { type: String  ,required: true},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  otp: { type: String },
  otpExpiresAt: { type: Date },
});

const signUp = mongoose.model("signUp", signUpSchema);
export default signUp;
