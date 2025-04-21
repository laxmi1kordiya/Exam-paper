import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Questionschema = new Schema({
  question: { type: String },
  Chapter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chapter",
  }
});

const Question = mongoose.model("Question", Questionschema);
export default Question;
