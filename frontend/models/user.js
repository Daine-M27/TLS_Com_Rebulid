import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
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
