import express from "express";
import { ENV } from "./lib/env.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"

const app = express();

const __dirname = path.resolve();  // returns the CWD 
// console.log(__dirname)
const port = ENV.PORT
app.use(express.json()) // req.body
app.use(cookieParser())


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