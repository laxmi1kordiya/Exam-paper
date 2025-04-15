import mongoose from "mongoose";

const Schema = mongoose.Schema;

const standardSchema = new Schema({
  name: { type: String },
  Board_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "board",
  },
});

const standard = mongoose.model("standard", standardSchema);
export default standard;
