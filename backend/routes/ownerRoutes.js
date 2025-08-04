import express from "express";
import {
  changeRoleToOwner,
  deleteCar,
  getOwnerCars,
  listCar,
  toggleCarAvailability,
} from "../controllers/ownerController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post("/add-car", upload.single("image"), protect, listCar);
ownerRouter.get("/cars", protect, getOwnerCars);
ownerRouter.post("/toggle-car", protect, toggleCarAvailability);
ownerRouter.post("/delete-car", protect, deleteCar);

export default ownerRouter;
