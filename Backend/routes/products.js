import express from "express";
import { verifyUserToken, IsAdmin, IsUser } from "../middleware/auth.js";

// models
import Category from "../models/category.js";
import Finish from "../models/finish.js";
import Part from "../models/part.js";

// load .env information into process.env
// dotenv.config();
const router = express.Router();

/** Create product or Update if existing category */
router.post("/category", verifyUserToken, IsAdmin, async (req, res) => {
  // deconstruct req.body
  const { name, code, position } = req.body;

  if ((name, code, position)) {
    Category.findOneAndUpdate(
      { code },
      { name, code, position },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) {
          res.status(400).send({ error: 'Error saving to database' });
        }
        res.status(200).send({ doc });
      }
    );
  } else {
    res.status(400).send({ error: "Missing data in request body." });
  }
});

/** Get All product categories */
router.get("/categories", verifyUserToken, IsAdmin, (req, res) => {});

/** Get Single product category */
router.get("/category/:categoryId", verifyUserToken, IsAdmin, (req, res) => {});

/** Update product category */
// router.put("/category/:categoryId", verifyUserToken, IsAdmin, (req, res) => {});

/** Delete product category */
router.delete("/category", verifyUserToken, IsAdmin, (req, res) => {});

export default router;
