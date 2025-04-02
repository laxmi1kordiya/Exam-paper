import mongoose from "mongoose";

const Schema = mongoose.Schema;

const signUpSchema = new Schema({
  name: { type: String },
  mobile: { type: String },
  distict: { type: String  },
  address: { type: String },
  type: { type: String },
  code: { type: String },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

// signUpSchema.index(index);

const signUp = mongoose.model("signUp", signUpSchema);
export default signUp;
