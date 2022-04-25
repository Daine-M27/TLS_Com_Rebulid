import express from "express";
import { verifyUserToken, IsAdmin, IsUser } from "../middleware/auth.js";

// models
import category from "../models/category";
import finish from "../models/finish";
import part from "../models/part";


// load .env information into process.env
dotenv.config();
const router = express.Router();

router.get('/')

export default router;