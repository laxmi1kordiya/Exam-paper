import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chapterSchema = new Schema({
  name: { type: String },
  Subject_id: { type: String },
});

const chapter = mongoose.model("chapter", chapterSchema);
export default chapter;