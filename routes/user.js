import express from "express";
import { addUser, getUser, getUsers } from "../controllers/user.js";

const router = express.Router();
router.post("/", addUser);
router.get("/getUsers", getUsers);
router.get("/getUser", getUser);
export default router;
