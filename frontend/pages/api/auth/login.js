import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

const tokenSecret = process.env.TOKEN_SECRET;

export default async function (req, res) {
    const { username, password } = req.body;
    console.log(username, password);

    await dbConnect();

    try {
        const user = await User.findOne({username: username})
        
        const validPass = await bcrypt.compare( password, user.password )
        
        if(!validPass) { 
            res.status(401).json({message: "Invalid Credentials!"})
            
        } else {
            const token = sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // seven days
                username: user.username,
                userType: user.userType,
                userEmail: user.email,
                repStatus: user.repStatus,
                id: user._id,
            }, tokenSecret)
    
            const serialized = serialize("theLightSource", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            })
            
            // update last login
            await User.findByIdAndUpdate(user._id, {
                lastLogin: Date().toString()
            })
            
            res.setHeader("Set-Cookie", serialized)
            res.status(200).json({message: "Login Successful!"})
        }
    } catch (error) {
        res.status(401).json({message: "Invalid Credentials!"})
    }

}


