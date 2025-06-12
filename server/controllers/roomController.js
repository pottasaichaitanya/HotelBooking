import { populate } from "dotenv";
import Hotel from "../models/hotel.js";
import Room from "../models/room.js";
export const createRoom = async (req, res) => {
   try{
    const {roomType,pricePerNight,amenties} = req.body;
const hotel=await Hotel.findOne({owner:req.auth.userId});
   if(!hotel){
    res.json({success:false,message:"Hotel not found"});
   }
   const uploadImages=req.files.map(async(file)=>{
    const response=await connectCloudinary.uploader.upload(file.path);
    return response.secure_url;
   })
   const images=await Promise.all(uploadImages);
   await Room.create({
    hotel:hotel._id,
    roomType,
    pricePerNight:+pricePerNight,
    amenities:JSON.parse(amenties),
    images,

   });
   res.json({success:true,message:"Room created successfully"});
}

   catch(error){
         console.error("Error creating room:", error);
         return res.status(500).json({ success: false, message: error.message });
   }
};
export const getRooms = async (req, res) => {

try{
   const rooms=await Room.find({isAvailable:true}).populate({
      path:'hotel',
      populate:{
         path:'owner',
         select:'image'
      }}).sort({createdAt:-1});
   res.json({success:true,rooms});
}

catch(error){
   console.error("Error fetching rooms:", error);
   return res.status(500).json({ success: false, message: error.message });
}
};


export const getOwnerRooms = async (req, res) => {
try{
   const hotelData=await Hotel({owner:req.auth.userId});
   const rooms =await Room.find({hotel:hotelData._id.toString()}).populate("hotel")
    res.json({success:true,rooms});
}
catch(error){
   console.error("Error fetching owner's rooms:", error);
   return res.status(500).json({ success: false, message: error.message });
}





};



export const toggleRoomAvailability = async (req, res) => {
try {
   const { roomId } = req.body;
   const roomData=await Room.findById(roomId);
   roomData.isAvailable = !roomData.isAvailable;
   await roomData.save();
   res.json({ success: true, message: "Room availability toggled successfully"});

 }
 catch (error) {
    console.error("Error toggling room availability:", error);
    return res.status(500).json({ success: false, message: error.message });
  }



};
