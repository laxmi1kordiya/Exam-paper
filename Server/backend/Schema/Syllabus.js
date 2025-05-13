import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  topic__name: { type: String, required: true },
  t_id: { type: String, required: true }, // Unique ID generated on frontend
});

const SyllabusSchema = new mongoose.Schema({
  Board_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  Standard_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Standard",
    required: true,
  },
  Subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  Chapter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  topics: {
    type: [TopicSchema],
    default: [],
  },
});

const syllabus = mongoose.model("Syllabus", SyllabusSchema);
export default syllabus;
