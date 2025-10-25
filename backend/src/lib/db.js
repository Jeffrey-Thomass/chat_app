import mongoose from "mongoose";

export const connectDB= async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log("mongoDB connected" , con.connection.host);
    }catch(error){
        console.error("Error connecting to mongoDB", error)
        process.exit(1)  // 1 means fail , 0 means success
    }
}