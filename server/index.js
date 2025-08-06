import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
const PORT = process.env.PORT || 3000;
connectDB();
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
