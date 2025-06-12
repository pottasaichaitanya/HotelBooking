import { registerHotel } from "../controllers/hotelController.js";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const hotelRouter = express.Router();
hotelRouter.post("/", protect, registerHotel);
export default hotelRouter; 
