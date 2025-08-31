import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  getAllCars,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUser);
userRouter.get("/cars", getAllCars);

export default userRouter;
