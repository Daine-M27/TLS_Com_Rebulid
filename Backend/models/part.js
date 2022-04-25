import mongoose from "mongoose";

const { Schema } = mongoose;

const partSchema = new Schema(
  {
    name: String,
    code: String,
    position: Number,
  },
  { timestamps: true }
);

export default mongoose.model("part", partSchema, "parts");