import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: String,
    code: String,
    position: Number,
  },
  { timestamps: true }
);

export default mongoose.model("category", categorySchema, "categories");
