
import { useLocation, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import React from 'react'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
import HotelReg from './components/HotelReg'
import LayOut from './pages/hotelOwner/LayOut'
import AddRoom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom'
import DashBoard from './pages/hotelOwner/DashBoard'
import {Toaster} from 'react-hot-toast'
import {useAppContext} from './context/AppContext'
function App() {
  const isOwnerPath = useLocation().pathname.includes('owner')
  const {showHotelReg} = useAppContext();

  return (
    <div>
      <Toaster/>
      {!isOwnerPath && <Navbar />}
      {showHotelReg  && <HotelReg />}
      <div className={`min-h-[70vh]`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/owner' element={<LayOut />}>
            <Route index element={<DashBoard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-room' element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
