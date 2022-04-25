import express from "express";
// import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
import { verifyUserToken, IsAdmin, IsUser } from "../middleware/auth.js";

// load .env information into process.env
dotenv.config();
const router = express.Router();

/**
 * Create User
 */
router.post("/register", verifyUserToken, IsAdmin, async function (req, res) {
  // deconstruct req.body
  const { name, email, password, companyCode, repStatus, userType } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // check for all values
  if (
    name &&
    email &&
    password &&
    companyCode &&
    repStatus != null &&
    userType
  ) {
    // Save User in the database
    User.findOneAndUpdate(
      { email }, // filter to look for
      {
        name,
        email,
        password: hashPassword,
        companyCode,
        repStatus,
        userType,
      },
      { new: true, upsert: true },
      (err, registeredUser) => {
        if (err) {
          console.log(err);
          res.status(400).send({ error: "Error saving to database." });
        } else {
          // create payload then Generate an access token
          let payload = {
            id: registeredUser._id,
            userType: userType,
          };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.status(200).send({ token });
        }
      }
    );
  } else {
    console.log("Registration Error");
    res.status(400).send({ error: "Missing data in request body." });
  }
});

/**
 * Delete user by email address
 */
router.post("/delete", verifyUserToken, IsAdmin, async function (req, res) {
  User.findOneAndDelete({ email: req.body.email }, async (err, user) => {
    if (err) {
      console.log(err);
      res.status(400).send({ error: "Unable to delete record." });
    } else {
      res.status(200).send({ deleted: `${user}` });
    }
  });
});

/**
 * Login with user account
 */
router.post("/login", async function (req, res) {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        const validPass = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPass)
          return res.status(401).send("Invalid Username or Password");

        // Create and assign token
        let payload = {
          id: user._id,
          userType: user.userType,
        };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);

        res.status(200).header("auth-token", token).send({ token });
      } else {
        res.status(401).send("Invalid Username or Password");
      }
    }
  });
});

export default router;
