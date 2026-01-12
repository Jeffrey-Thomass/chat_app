import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {ENV} from "../lib/env.js";

export const socketAuthMiddleware = async (socket,next) => {
    try {
        // extract the token from http-only cookies
        const token = socket.handshake.headers.cookie
        ?.split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];

        if(!token){
            console.log("Socket connection rejected : No token found");
            return next(new Error ("Unauthorized - no token provided"));
        }
        // verify the token 
        const decoded = jwt.verify(token , ENV.JWT_SECRET);
        if(!decoded){
            console.log("Socket connection rejected : Invalid token");
            return next(new Error ("Unauthorized - invalid token"));
        }
        // find the user from db
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            console.log("Socket connection rejected : User not found");
            return next(new Error ("Unauthorized - user not found"));
        }
        socket.user = user;
        socket.userId = user._id.toString()

        console.log(`Socket connection accepted : ${user.fullName}`);

        next();
    }
    catch (error) {
        console.log("Error in socket auth middleware: ", error.message);
        next(new Error("Unauthorized - Authentication failed"));
    }
}