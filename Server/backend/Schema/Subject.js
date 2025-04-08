import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: { type: String },
  Semester_id: { type: String },
});

const subject = mongoose.model("subject", subjectSchema);
export default subject;