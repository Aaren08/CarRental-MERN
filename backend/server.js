import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// CONNECT TO DATABASE
await connectDB();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running...",
  });
});

// ROUTES
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
