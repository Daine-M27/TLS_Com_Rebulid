import express from "express";
import { verifyUserToken, IsAdmin, IsUser } from "../middleware/auth.js";

// models
import category from "../models/category";
import finish from "../models/finish";
import part from "../models/part";


// load .env information into process.env
dotenv.config();
const router = express.Router();

/** Create product category */
router.post('/category',verifyUserToken, IsAdmin, (req, res) => {
  
})

/** Get All product categories */
router.get('/categories',verifyUserToken, IsAdmin, (req, res) => {

})

/** Get Single product category */
router.get('/category/:categoryId',verifyUserToken, IsAdmin, (req, res) => {

})

/** Update product category */
router.put('/category/:categoryId',verifyUserToken, IsAdmin, (req, res) => {

})

/** Delete product category */
router.delete('/category',verifyUserToken, IsAdmin, (req, res) => {

})

export default router;