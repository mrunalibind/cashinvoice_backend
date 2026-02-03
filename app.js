import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/student.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/students", studentRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
