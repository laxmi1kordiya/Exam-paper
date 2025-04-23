import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Questionschema = new Schema({
  questionType: { type: String },
  questionList: { type: Array },
  Chapter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chapter",
  },

  // Board_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "board",
  // },
  // Standard_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "standard",
  // },
  // Semester_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "semester",
  // },
  // Subject_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "subject",
  // },

});

const Question = mongoose.model("Question", Questionschema);
export default Question;
