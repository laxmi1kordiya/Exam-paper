import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: { type: String },
  Board_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "board",
  },
  Standard_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "standard",
  },
  Semester_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "semester",
  },
});

const subject = mongoose.model("subject", subjectSchema);
export default subject;