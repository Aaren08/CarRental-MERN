import User from "../models/userModel.js";
import Car from "../models/carModel.js";

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

    res.status(200).json({ success: true, message: "Car listed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
