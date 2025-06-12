import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Title from '../../components/Title'
import { dashboardDummyData, assets } from '../../assets/assets'
const DashBoard = () => {
    const [dashboarddata, setDashboardData] = useState(dashboardDummyData);
    return (
        <div>
            <Title align='left' text='Dashboard' subtitle='Monitor your room listings ,track your bookings and manage your hotel settings in one place.Stay updated with the latest information and insights.' />
            {/* Total Bookings */}
            <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
                <img src={assets.totalBookingIcon} alt="Total Bookings" className='max-sm:hidden h-10' />
                <div className='flex flex-col sm:ml-4 font-medium gap-1'>
                    <p className='text-blue-500 text-lg'>Total Bookings</p>
                    <p className='text-neutral-400 text-base'>{dashboarddata.totalBookings}</p>
                </div>
            </div>
            {/* Total Revenue */}
            <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
                <img src={assets.totalRevenueIcon} alt="Total Revenue" className='max-sm:hidden h-10' />
                <div className='flex flex-col sm:ml-4 font-medium gap-1'>
                    <p className='text-blue-500 text-lg'>Total Revenue</p>
                    <p className='text-neutral-400 text-base'>{dashboarddata.totalRevenue}</p>
                </div>
            </div>
            {/* Recent Booking */}
            <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>
            <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overfloe-y-scroll'>
                <table className='w-full'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Room Name</th>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Total Amount</th>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Payment Status</th>
                            <th className='py-3 px-4 text-gray-800 font-medium'>Guests</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboarddata.bookings.map((item, index) => (
                            <tr key={index} >
                                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{item.user.username}</td>
                                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>{item.room.roomType}</td>
                                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>${item.totalPrice}</td>
                                <td className={`py-3 px-4 border-t border-gray-300 flex`}><button className={`py-1 px-4 text-xs rounded-full mx-auto ${item.isPaid ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{item.isPaid ? 'Paid' : 'Pending'}</button>
                                </td>
                                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{item.guests}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
        
    )
}

export default DashBoard
