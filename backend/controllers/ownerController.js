import User from "../models/userModel.js";
import Car from "../models/carModel.js";
import Booking from "../models/bookingModel.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";

// CHANGE ROLE TO OWNER
export const changeRoleToOwner = async (req, res) => {
  const { _id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { role: "owner" },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Now you can list cars",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// LIST A NEW CAR
export const listCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    // STORING IMAGE ON IMAGEKIT
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // IMAGE OPTIMIZATION WITH IMAGEKIT
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          width: "1280",
        },
        {
          quality: "auto",
        },
        {
          format: "webp",
        },
      ],
    });

    const image = optimizedImageUrl;
    await Car.create({ ...car, image, owner: _id });
    res.status(200).json({ success: true, message: "Car listed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET OWNER CARS
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id }).populate("owner");
    res.status(200).json({ success: true, cars });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// TOGGLE CAR AVAILABILITY
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    // CHECK IF CAR BELONGS TO USER
    if (car.owner.toString() !== _id.toString()) {
      return res.status(400).json({ success: false, message: "Unauthorized" });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();
    res
      .status(200)
      .json({ success: true, message: "Car availability toggled" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE A CAR
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    // CHECK IF CAR BELONGS TO USER
    if (car.owner.toString() !== _id.toString()) {
      return res.status(400).json({ success: false, message: "Unauthorized" });
    }

    await Car.findByIdAndDelete(carId);
    res
      .status(200)
      .json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET DASHBOARD DATA
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.status(400).json({ success: false, message: "Unauthorized" });
    }

    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id }).populate("car").sort({
      createdAt: -1,
    });
    const pendingBookings = await Booking.find({
      owner: _id,
      status: "pending",
    });
    const completedBookings = await Booking.find({
      owner: _id,
      status: "confirmed",
    });

    // CALCULATE MONTHLY REVENUE
    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE USER IMAGE
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const { imageFile } = req.file;

    // STORING IMAGE ON IMAGEKIT
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });

    // IMAGE OPTIMIZATION WITH IMAGEKIT
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          width: "400",
        },
        {
          quality: "auto",
        },
        {
          format: "webp",
        },
      ],
    });

    const image = optimizedImageUrl;
    await User.findByIdAndUpdate(_id, { image });

    res.status(200).json({ success: true, message: "Profile image updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
