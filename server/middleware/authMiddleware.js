import User from "../models/user.js";
export const protect = async (req, res, next) => {
    const { userId } = req.auth;
    if (!userId) {
        res.json({ success: false, message: "Unauthorized access" });
    }
    else
    {
        console.log("User ID:", userId);
        const user = await User.findById(userId);
        req.user = user;
        next();
    }
}