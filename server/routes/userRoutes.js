import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  singleUser,
} from "../controllers/userController.js";
const app = express.Router();
app.get("/", getUsers);
app.get("/:id", singleUser);
app.post("/", createUser);
app.put("/:id", updateUser);
app.delete("/:id", deleteUser);
export default app;
