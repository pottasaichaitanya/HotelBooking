import express from 'express';
import { createBooking,checkRoomAvailability,getHotelBookings,getUserBookings } from '../controllers/bookingController.js';
import {protect} from '../middleware/authMiddleware.js';
const bookingRouter = express.Router();
bookingRouter.post('/check-availability', checkRoomAvailability);
bookingRouter.post('/booking', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect, getHotelBookings);
export default bookingRouter;