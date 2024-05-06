import express from "express";
import { getMess, sendMess } from "../controllers/message.js";

const router = express.Router();
router.post("/", sendMess);
router.get("/getMess", getMess);
export default router;
