import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";


dotenv.config();

const app = express();

const __dirname = path.resolve();  // returns the CWD 
// console.log(__dirname)
const port = process.env.PORT
app.use(express.json()) // req.body

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)



if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get(/.*/, (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    })
}

app.listen(port, () => {
    console.log("Server is running on port " + port);
    connectDB();
});