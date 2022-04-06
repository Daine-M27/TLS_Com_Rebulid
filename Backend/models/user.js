import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  companyCode: String,
  repStatus: Boolean,
  userType: String,
});

export default mongoose.model("user", userSchema, "users");