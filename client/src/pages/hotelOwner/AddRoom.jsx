import React, { useState } from 'react'
import Title from '../../components/Title';
import { assets } from '../../assets/assets'
const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Pool Access': false,
      'Mountain View': false
    },
    hotelId: ''
  });
  return (
    <form>
      <Title title='Add New Room' align='left' font='outfit' subtitle='Fill  in the details carefully and enter the room information below.' />
      {/* Upload rea For Images */}
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {
          Object.keys(images).map((key) => (
            <label htmlFor={`roomImage${key}`} key={key}>
              Upload Image {key}
              <img className='max-h-13 cursor-pointer opacity-80'
                src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
                alt=" " />
              <input type="file" id={`roomImage${key}`} accept="image/*" hidden onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })} />
            </label>
          ))
        }
      </div>
      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Room Type</p>
          <select className='w-full p-2 border border-gray-300 rounded' value={inputs.roomType} onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}>
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
        </div>
        <div>
          <p className='mt-4 text-gray-800'>Price <span className='text-xs'>/night</span></p>
          <input type="number" className='w-full p-2 border border-gray-300 rounded p-2 w-24' value={inputs.pricePerNight} onChange={(e) => setInputs({ ...inputs, pricePerNight: e.target.value })} />
        </div>
        <p className='text-gray-800 mt-4'>Amenties</p>
        <div>
          {Object.keys(inputs.amenities).map((amenity,index) => 
          {
            return(
            <div key={index} >
              <input type="checkbox" id={`amenities${index+1}`} checked={inputs.amenities[amenity]} onChange={() => setInputs({ ...inputs, amenities: { ...inputs.amenities, [amenity]: !inputs.amenities[amenity] } })} />

              <label htmlFor={`amenities${index+1}`} className='ml-2 text-gray-700'>{amenity}</label>
            </div>
            )
          })}
        </div>
        <button className='bg-blue-500 text-white px-8 rounded mt-8 cursor-pointer'>Add Room</button>

    </form>
  )
}

export default AddRoom
