// import createUser from "../../../lib/createUser";
import User from "../../../models/User";
import dbConnect from "../../../lib/db";
import { hash, genSalt } from "bcryptjs";

export default function(req, res) {
  return new Promise(async (resolve, reject) => {
    const { method } = req
    
    if (method === 'GET') {
      try {
        const users = await User.find({}, {password: false})
        res.status(200).json({message:'Success', users})
        resolve()    
      } catch (error) {
        res.status(500).json({message: 'Error getting all users'})
        resolve()
      }

    }
    else if (method === 'POST') {  
      const {
        firstName,
        lastName,
        email,
        password,
        companyCode,
        repStatus,
        userType,
      } = req.body;
      // Check for all values
      if (
        firstName &&
        lastName &&
        email &&
        password &&
        companyCode &&
        repStatus != null &&
        userType
      ) {
        // Connect to database
        await dbConnect();
  
        // Hash password
        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);
  
        // Save User in the database
        User.findOneAndUpdate(
          { email }, // filter to look for
          {
            firstName,
            lastName,
            email,
            password: hashPassword,
            companyCode,
            repStatus,
            userType,
          },
          { new: true, upsert: true },
          (err, createdUser) => {
            if (err) {
              console.log(err);
              res.status(400).json({ message: "Error saving to database." });
              resolve()
              
            } else {
              res.status(200).json({ message: "Success", createdUser });
              resolve()
            }
          }
        );
      } else {
        res.status(400).json({ message: "Missing or Invalid Data" });
        resolve()
      }
    }
  })  
}
