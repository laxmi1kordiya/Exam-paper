import mongoose from "mongoose";

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  mobile: { type: String },
//   mobile: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpiresAt: { type: Date }

});

const login = mongoose.model("login", loginSchema);
export default login;
