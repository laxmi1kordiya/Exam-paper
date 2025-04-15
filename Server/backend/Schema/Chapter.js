import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chapterSchema = new Schema({
  name: { type: String },
  Board_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "board",
  },
  Standard_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "standard",
  },
  Subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
  },
});

const chapter = mongoose.model("chapter", chapterSchema);
export default chapter;