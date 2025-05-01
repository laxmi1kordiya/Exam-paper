import mongoose from "mongoose";

const Schema = mongoose.Schema;

const saveSchema = new Schema({
  title: { type: String },
  subtitle: { type: String },
  // studentName: { type: String },
  // standard: { type: String },
  // subject: { type: String },
  // totalMarks: {type: Number},
  // obtainedMarks: {type: Number},
  // date: {type: Date},
  logoPreview: { type: String },
});

const paperSetting = mongoose.model("paperSetting", saveSchema);
export default paperSetting;
