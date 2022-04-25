import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

// load .env information into process.env
dotenv.config();

// Routers
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json());

// database connection
try {
  mongoose.connect(process.env.DB_CONNECT);
  console.log("DB Connected");
} catch (error) {
  console.log(error);
}

app.use("/users", usersRouter);
app.use("/products", productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.json({ error: "route does not exist" });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
