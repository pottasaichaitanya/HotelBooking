export const getUserData=async(req,res)=>{

    try{
        const role=req.user.role;
        const recentSearchedCities=req.user.recentSearchedCities;
        res.json({
            success:true,role,recentSearchedCities
        });
    }
    catch(err){
        console.error("Error fetching user data:", err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const storeRecentSearchedCities=async(req,res)=>{
    try{
        const {recentSearchedCity} = req.body;
        const user=await req.user;
        if(user.recentSearchedCities.length<3){
            user.recentSearchedCities.push(recentSearchedCity);
        }
        else{
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCity);
            await user.save();
            res.json({
                success:true,
                message:"Recent searched cities updated successfully"
            });
        }

    }
    catch(err){
        console.error("Error storing recent searched cities:", err);
        res.status(500).json({ success: false, message: err.message });
    }
}