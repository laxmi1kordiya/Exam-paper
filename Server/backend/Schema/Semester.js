import mongoose from "mongoose";

const Schema = mongoose.Schema;

const semesterSchema = new Schema({
  name: { type: String },
  Board_id: { type: String },
  Standard_id: { type: String },
});

const semester = mongoose.model("semester", semesterSchema);
export default semester;
