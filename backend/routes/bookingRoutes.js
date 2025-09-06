import express from "express";
import {
  checkCarAvailabilityForLocation,
  createBooking,
  getUserBookings,
  getOwnerBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkCarAvailabilityForLocation);
bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.post("/change-status", protect, updateBookingStatus);

export default bookingRouter;
