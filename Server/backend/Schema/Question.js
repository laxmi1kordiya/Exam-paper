import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the structure for each question in questionList with q_id
const questionSchema = new Schema({
  question: { type: String },
  q_id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
}, { _id: false }); // Disable automatic _id for sub-documents

const Questionschema = new Schema({
  questionType: { type: String },
  questionList: { type: [questionSchema] }, // Use the sub-schema for questionList
  Chapter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chapter",
  },
});

const Question = mongoose.model("Question", Questionschema);
export default Question;