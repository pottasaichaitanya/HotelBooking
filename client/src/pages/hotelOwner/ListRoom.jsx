import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets,roomsDummyData } from '../../assets/assets'

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData); // Assuming you will fetch room data later
  return (
    <div>
      <Title title='List of Rooms' font='outfit' align='left' subtitle='Here you can see all the rooms you have added to your hotel. You can manage them as per your requirements.' />
      <p className='text-gray-500 mt-8'>All Rooms</p>
      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium'>Facility</th>
              <th className='py-3 px-4 text-gray-800 font-medium'>Price/night</th>
              <th className='py-3 px-4 text-gray-800 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
{
  rooms.map((item,index)=>{
    return(
      <tr key={index}>
        <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
          {item.roomType}
        </td>
        <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
          {item.amenities.join(', ')}
        </td>
        <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
          {item.pricePerNight}
        </td>
        <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-sm text-red-500 text-center'>
          <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
            <input type="checkbox" className='sr-only peer' checked={item.isAvailable} />
            <div className='w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[""] after:absolute after:top-1 after:left-1 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all'></div>
           <span className='dot absolute left-1 top-1 bg-white border border-gray-300 rounded-full w-4 h-4'></span>
          </label>

          
        </td>


      </tr>
    )
  })
}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListRoom
