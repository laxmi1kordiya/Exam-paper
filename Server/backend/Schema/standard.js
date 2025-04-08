import mongoose from "mongoose";

const Schema = mongoose.Schema;

const standardSchema = new Schema({
  name: { type: String },
  Board_id: { type: String },
});

const Standard = mongoose.model("Standard", standardSchema);
export default Standard;
