import mongoose from "mongoose";

const Schema = mongoose.Schema;

const standardSchema = new Schema({
  name: { type: String },
  Board_id: { type: String },
});

const standard = mongoose.model("standard", standardSchema);
export default standard;
