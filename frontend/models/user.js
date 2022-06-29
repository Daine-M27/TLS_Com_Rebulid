import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
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

const User = models.User || mongoose.model("user", userSchema, "users");

export default User
