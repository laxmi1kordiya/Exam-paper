import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaperSchema = new Schema({
  paperSetting: { type: Object },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const paper = mongoose.model("paper", PaperSchema);
export default paper;
