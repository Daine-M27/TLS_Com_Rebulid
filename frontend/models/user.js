import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    name: String,
    email: String,
    password: String,
    companyCode: String,
    repStatus: Boolean,
    userType: String,
    lastLogin: Date
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
