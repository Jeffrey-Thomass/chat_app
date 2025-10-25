import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";


dotenv.config();

const app = express();
const port = process.env.PORT

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)

app.listen(port, () => {
    console.log("Server is running on port " + port);
});