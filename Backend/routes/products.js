import express from "express";
import { verifyUserToken, IsAdmin, IsUser } from "../middleware/auth.js";

// models
import Category from "../models/category.js";
import Finish from "../models/finish.js";
import Part from "../models/part.js";

// load .env information into process.env
// dotenv.config();
const router = express.Router();

//------------------------Product Category Routes------------------------//
///////////////////////////////////////////////////////////////////////////
/** Create product category or Update if existing */
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
  const categoryId = req.params.categoryId;
  Category.findById(categoryId, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(400).send({ error: "Error getting finish from database" });
    } else {
      res.status(200).send(doc);
    }
  });
});

/** Delete product category */
router.delete("/category/:categoryId", verifyUserToken, IsAdmin, (req, res) => {
  const categoryId = req.params.categoryId;
  Category.findByIdAndDelete(categoryId, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(400).send({ error: "Error deleting category from database" });
    } else {
      res.status(200).send(doc);
    }
  });

  //------------------TODO------------------//
  // Add logic to check for products that are in category on delete, remove or alert user that products exsits before deleting.
  // Part.find({category: "categoryId"})
});

//-------------------------Product Finish Routes-------------------------//
///////////////////////////////////////////////////////////////////////////
/** Create product finish or Update if existing */
router.post("/finish", verifyUserToken, IsAdmin, async (req, res) => {
  // deconstruct body
  const { name } = req.body;

  if (name) {
    Finish.findOneAndUpdate(
      { name },
      { name },
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

/** Get All product finishes */
router.get("/finishes", async (req, res) => {
  Finish.find((err, docs) => {
    if (err) {
      console.log(err);
      res.status(400).send({ error: "Error getting finishes from database" });
    } else {
      res.status(200).send(docs);
    }
  });
});

/** Get Single product finish */
router.get("/finish/:finishId", async (req, res) => {
  const finishId = req.params.finishId;
  Finish.findById(finishId, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(400).send({ error: "Error getting finish from database" });
    } else {
      res.status(200).send(doc);
    }
  });
});

/** Delete product finish */
router.delete("/finish/:finishId", verifyUserToken, IsAdmin, async (req, res) => {
  const finishId = req.params.finishId;
  Finish.findByIdAndDelete(finishId, (err, doc) => {
    if (err) {
      console.log(err);
      res
        .status(400)
        .send({ error: "Error deleting category from database" });
    } else {
      res.status(200).send(doc);
    }
  });
});

export default router;
