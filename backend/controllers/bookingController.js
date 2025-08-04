import Car from "../models/carModel.js";
import Booking from "../models/bookingModel.js";

// CHECK AVAILABILITY OF A CAR FOR GIVEN DATE
export const checkCarAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });

  return bookings.length === 0;
};

// CHECK AVAILABILITY OF CARS FOR GIVEN DATE RANGE AND LOCATION
export const checkCarAvailabilityForLocation = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    const cars = await Car.find({ location, isAvailable: true });

    // CHECK AVAILABILITY OF ALL CARS USING PROMISES
    const availableCarsPromise = cars.map(async (car) => {
      const isAvailable = await checkCarAvailability(
        car._id,
        pickupDate,
        returnDate
      );
      return { ...car._doc, isAvailable: isAvailable };
    });

    const availableCars = await Promise.all(availableCarsPromise);
    availableCars = availableCars.filter((car) => car.isAvailable);
    res.status(200).json({ success: true, cars: availableCars });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE A BOOKING
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkCarAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res
        .status(400)
        .json({ success: false, message: "Car not available" });
    }

    const carData = await Car.findById(car);
    if (carData.owner.toString() === _id.toString()) {
      return res
        .status(400)
        .json({ success: false, message: "You can't book your own car" });
    }

    // CALCULATE PRICE BASED ON PICKUP DATE AND RETURN DATE
    const pickedCar = new Date(pickupDate);
    const returnedCar = new Date(returnDate);
    const noOfDays = Math.ceil(
      (returnedCar - pickedCar) / (1000 * 60 * 60 * 24)
    );
    const price = noOfDays * carData.pricePerDay;

    const booking = await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      price,
      pickupDate,
      returnDate,
    });
    res
      .status(200)
      .json({ success: true, message: "Booking created", booking });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER BOOKINGS
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET OWNER BOOKINGS
export const getOwnerBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ owner: _id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE BOOKING STATUS
export const updateBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);

    if (booking.owner.toString() !== _id.toString()) {
      return res.status(400).json({ success: false, message: "Unauthorized" });
    }
    booking.status = status;
    await booking.save();

    res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
