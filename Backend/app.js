
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

// load .env information into process.env
dotenv.config();

// Routers
import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json());

// database connection
try {
  mongoose.connect(process.env.DB_CONNECT)
  console.log('DB Connected')
} catch (error) {
  console.log(error)
}


app.use("/users", usersRouter);
app.get("/", (req, res) => res.send("Welcome"));
app.all("*", (req, res) => res.send("That route doesnt exist."));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
