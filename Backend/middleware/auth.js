import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// load .env information into process.env
dotenv.config();

const verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization;
  // console.log(token)
  if (!token) {
    return res
      .status(401)
      .send({ error: "Access Denied / Unauthorized request" });
  }

  try {
    token = token.split(" ")[1]; // Remove Bearer from string
    // console.log(token)
    if (token === "null" || !token) {
      return res.status(401).send({ error: "Unauthorized request 1" });
    }

    let verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verifiedUser) {
      return res.status(401).send({ error: "Unauthorized request 2" });
    }

    req.user = verifiedUser; // user_id & user_type_id
    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid Token" });
  }
};

const IsUser = async (req, res, next) => {
  if (req.user.userType === "User") {
    next();
  } else {
    return res.status(401).send({ error: "Unauthorized! Not a valid user" });
  }
};

const IsAdmin = async (req, res, next) => {
  if (req.user.userType === "Administrator") {
    console.log(req.user);
    next();
  } else {
    return res.status(401).send({ error: "Unauthorized! Non-Administrator" });
  }
};

export { verifyUserToken, IsUser, IsAdmin };
