import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        const { MONGO_URL} = ENV;
        if(!MONGO_URL){
            throw new Error("MONGO_URL is not defined")
        }
        const con = await mongoose.connect(ENV.MONGO_URL);
        console.log("mongoDB connected" , con.connection.host);
    }catch(error){
        console.error("Error connecting to mongoDB", error)
        process.exit(1)  
    }
}