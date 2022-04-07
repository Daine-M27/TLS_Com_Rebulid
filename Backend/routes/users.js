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

router.post("/register", async function (req, res) {
  // deconstruct req.body
  const { name, email, password, companyCode, repStatus, userType } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // check for all values
  if ( name && email && password && companyCode && repStatus != null && userType ) {
    // Create an user object
    let user = new User({
      name,
      email,
      password: hashPassword,
      companyCode,
      repStatus,
      userType,
    });

    // Save User in the database
    User.findOneAndUpdate(
      { email },
      { 
        name: user.name,
        email:user.email,
        password: user.password,
        companyCode: user.companyCode,
        repStatus: user.repStatus,
        userType: user.userType
      },
      { new: true, upsert: true },
      (err, registeredUser) => {
        if (err) {
          console.log(err);
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
    res.status(400).send({ error: "Missing data in request body." });
  }
});

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
          return res.status(401).send("Email or Password is wrong");

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
