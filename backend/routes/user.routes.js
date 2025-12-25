import express from "express";
const userRouter = express.Router();
import { getUserById } from "../controllers/user.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
userRouter.get("/current",isAuth, getUserById);
export default userRouter