import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", schema);
export default User;
