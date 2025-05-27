import mongoose from "mongoose";

const Schema = mongoose.Schema;

const saveSchema = new Schema({
  title: { type: String },
  subtitle: { type: String },
  WaterMark: { type: String },
  WaterMarkTaxt: { type: String },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const paperSetting = mongoose.model("paperSetting", saveSchema);
export default paperSetting;
