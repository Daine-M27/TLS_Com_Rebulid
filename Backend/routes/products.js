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
  // deconstruct body
  const { name, code, position } = req.body;

  if ((name, code, position)) {
    Category.findOneAndUpdate(
      { code },
      { name, code, position },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) {
          res.status(400).send({ error: "Error saving to database" });
        }
        res.status(200).send({ doc });
      }
    );
  } else {
    res.status(400).send({ error: "Missing data in request body." });
  }
});

/** Get All product categories */
router.get("/categories", (req, res) => {
  Category.find((err, docs) => {
    if (err) {
      console.log(err);
      res.status(400).send({ error: "Error getting categories from database" });
    } else {
      res.status(200).send(docs);
    }
  });
});

/** Get Single product category */
router.get("/category/:categoryId", (req, res) => {
  Category.findOne({ filter: req.params.categoryId }, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(400).send({ error: "Error getting categories from database" });
    } else {
      res.status(200).send(doc);
    }
  });
});

/** Delete product category */
router.delete("/category/:categoryId", verifyUserToken, IsAdmin, (req, res) => {
  Category.findByIdAndDelete(req.params.categoryId, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(400).send({ error: "Error deleting category from database" });
    } else {
      res.status(200).send(doc);
    }
  });
});

export default router;
