import express ,{ Router } from "express";

const router = express.Router();

router.get("/send" , (req, res) => {
    res.end("send message endpoint")
})

export default router