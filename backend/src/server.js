import express from "express";
import "dotenv/config"
import { ENV } from "./lib/env.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import { app, server } from "./lib/socket.js";

// const app = express();

const __dirname = path.resolve();  // returns the CWD 
// console.log(__dirname)
// const port = ENV.PORT
const port = process.env.PORT || ENV.PORT || 3000;
app.use(cors({
    origin : ENV.CLIENT_URL ,
    credentials : true
}))
app.use(express.json({limit : "10mb"})) // req.body
app.use(cookieParser())


app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)



if(ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get(/.*/, (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    })
}

server.listen(port,"0.0.0.0", () => {
    console.log("Server is running on port " + port);
    connectDB();
});