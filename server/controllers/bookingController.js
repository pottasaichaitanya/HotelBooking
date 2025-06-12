import Booking from "../models/bookingSchema.js";
import Room from "../models/room.js";
import Hotel from "../models/hotel.js";
const checkAvailability = async ({checkInDate,checkOutDate,room}) => {

    try{
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: new Date(checkOutDate) },
            checkOutDate: { $gte: new Date(checkInDate) },
        });
       const isAvailable = bookings.length === 0;
         return isAvailable;
    } catch (error) {
        console.error("Error checking room availability:", error);
        throw new Error("Error checking room availability");
    }
}
// API to Chcek Room Availability
export const checkRoomAvailability = async (req, res) => {
    try{
        const{room, checkInDate, checkOutDate} = req.body;
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        res.json({success:true, isAvailable});
    }
    catch(error){
        console.error("Error checking room availability:", error);
        res.status(500).json({success:false, message:error.message});
    }
}

// API to Create Booking
export const createBooking = async (req, res) => {
    try{
        const { room, checkInDate, checkOutDate, guests} = req.body;
        const user = req.user._id;
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        if(!isAvailable){
            return res.status(400).json({success:false, message:"Room is not available for the selected dates"});
        }
        // Get total price from the room data
        const roomData=await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        const checkIn=new Date(checkInDate);
        const checkOut=new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        totalPrice *= nights;
        const booking = await Booking.create({user,room, hotel:roomData.hotel._id, checkInDate, checkOutDate, totalPrice, guests:+guests});
        res.json({success:true, message:"Booking created successfully"});




    }
    catch(error){
        console.error("Error creating booking:", error);
        res.status(500).json({success:false, message:error.message});
    }
}


// API to Get User Bookings
export const getUserBookings = async (req, res) => {
try{
    const user= req.user._id;
    const bookings = await Booking.find({user}).populate("room hotel").sort({createdAt:-1})
    res.json({success:true, bookings});

}
catch(error){
    console.error("Error fetching user bookings:", error);
    res.status(500).json({success:false, message:error.message});
}

}

// API to Get Hotel Bookings
export const getHotelBookings = async (req, res) => {
    try{
        const hotel=await Hotel.findOne({owner:req.auth.userId});
        if(!hotel){
            return res.json({success:false, message:"Hotel not found"});
        }
        const bookings = await Booking.find({hotel:hotel._id}).populate("room hotel user").sort({createdAt:-1});

        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
        res.json({success:true,dashboardData:{bookings, totalBookings, totalRevenue}});
    }
    catch(error){
        console.error("Error fetching hotel bookings:", error);
        res.status(500).json({success:false, message:error.message});
    }
}

