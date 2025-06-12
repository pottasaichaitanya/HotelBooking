import axios from 'axios';
import { createContext,useContext, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {useUser,useAuth} from '@clerk/clerk-react'




axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency=import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const {user}=useUser();
  const {getToken}=useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const[showHotelReg,setShowHotelReg]=useState(false);
  const[searchedCities,setSearchedCities]=useState([]);
  const fetchUser=async()=>{
    try{
    const {data}=await axios.get('/api/user',{
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    if(data.success){
      console.log("User data fetched successfully:", data);
        setIsOwner(data.role==='hotelOwner');
        setSearchedCities(data.recentSearchedCities)

    }
    else{
        setTimeout(()=>{
            fetchUser();
        },5000)
    }
}
    catch(error){
        toast.error(error.message);
    }
  }
  
  useEffect(()=>{
    if(user){
      fetchUser();
    }
  },[user])
  const value = {
    currency,navigate,user,getToken,isOwner,setIsOwner,axios,showHotelReg,setShowHotelReg,
    searchedCities,setSearchedCities,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};