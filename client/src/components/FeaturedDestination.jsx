import React from 'react'
import {roomsDummyData} from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import{ useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
const FeaturedDestination = () => {
  const { rooms,navigate } = useAppContext();


  return rooms.length > 0 && (
    <div className='flex flex-col items-center justify-center px-6 md:px-16 lg:px-24  bg-slate-50 py-20'>
      <Title title="Featured Destinations" subtitle="Explore and handpick  the best places around the world to stay,offering luxury and unforgettable experiences." />
       <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
         {rooms.slice(0,4).map((room, index) => (
           <HotelCard key={index} room={room} />
         ))}
       </div>
       <button onClick={()=>{navigate('/rooms');scrollTo(0,0)}} className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
        View All Destinations</button>
    </div>
  )
}

export default FeaturedDestination
