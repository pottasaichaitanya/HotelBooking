import Hotel from "../models/hotel.js";
import User from "../models/user.js";

export const getHotels = async (req, res) => {

}
export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        if (!req.user?._id) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }
        const owner = req.user._id;
        const hotel = await Hotel.findOne({ owner })
        if (hotel) {
            return res.json({ success: false, message: "Hotel already registered" });
        }
        await Hotel.create({
            name, address, contact, city, owner
        });
        await User.findByIdAndUpdate(owner, { role: "hotelOwner" });
        res.json({success:true,message:"Hotel registered successfully"});
    }
    catch (error) {
        console.error("Error registering hotel:", error);
        return res.status(500).json({ success: false, message: error.message });

    }
}