import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Questionschema = new Schema({
  question: { type: String },
});

const Question = mongoose.model("Question", Questionschema);
export default Question;
