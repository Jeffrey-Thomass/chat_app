import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req , res , next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if(!decoded) res.status(401).json({message:"Unauthorized - Invalid token"})

        const user = await User.findById(decoded.userId);
        if(!user) res.status(401).json({message:"Unauthorized - User not found"})
        req.user = user;
        next();
    }
    catch(err) {
        console.log("Error in protectRoute middleware: ", err);
        res.status(500).json({message:"internal server error"})
    }
}