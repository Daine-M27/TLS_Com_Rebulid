import mongoose from "mongoose";

const { Schema } = mongoose;

const finishSchema = new Schema(
  {
    name: String,  
  },
  { timestamps: true }
);

export default mongoose.model("finish", finishSchema, "finishes");