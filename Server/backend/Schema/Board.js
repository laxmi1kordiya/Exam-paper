import mongoose from "mongoose";

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: { type: String },
});

const board = mongoose.model("board", boardSchema);
export default board;