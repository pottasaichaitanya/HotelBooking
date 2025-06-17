import express from 'express';
import "dotenv/config";
import  cors from 'cors';
import {connectDB} from './config/db.js';
import {clerkMiddleware} from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRoutes from './routes/userRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
connectDB();
connectCloudinary();
const app=express();

app.use(cors());

app.use(express.json());
app.use(clerkMiddleware());

app.use('/api/clerk', clerkWebhooks);

app.get('/',(req,res)=>{
    res.send('Hello World!');
});
app.use('/api/user', userRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/room', roomRouter);
app.use('/api/booking', bookingRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});