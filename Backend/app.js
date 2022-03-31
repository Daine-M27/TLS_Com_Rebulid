import express from "express";
import bodyParser from "body-parser";

import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/users", usersRouter);
app.get("/", (req, res) => res.send("Welcome"));
app.all("*", (req, res) => res.send("That route doesnt exist."));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
