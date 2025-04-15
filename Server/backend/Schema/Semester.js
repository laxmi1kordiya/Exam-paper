import mongoose from "mongoose";

const Schema = mongoose.Schema;

const semesterSchema = new Schema({
  name: { type: String },
  Board_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "board",
  },
  Standard_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "standard",
  },
});

const semester = mongoose.model("semester", semesterSchema);
export default semester;
