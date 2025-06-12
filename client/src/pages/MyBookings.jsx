import React from 'react'
import Title from '../components/Title'
import { userBookingsDummyData, assets } from '../assets/assets'
import { useState } from 'react'

const MyBookings = () => {
    const [bookings, setBookings] = useState(userBookingsDummyData)
    return (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            <Title title='My Bookings' align='left' subTitle='Easily manage your past,current qand upcoming hotel reservations in one Place.Pla your trips seamlessly.' />
            <div className='max-w-6xl mt-8 w-full text-gray-800'>
                <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3 pb-2'>
                    <div className='w-1/3'>Hotels</div>
                    <div className='w-1/3'>Date & Timing </div>
                    <div className='w-1/3'>Payment</div>
                </div>
                {
                    bookings.map((booking, index) => {

                        <div key={booking.id} className='grid grid-cols-1 grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>
                            <div>
                                <img src={booking.room.images[0]} alt="hotel-img" className='min-md:w-44 rounded shadow object-cover' />
                                <div className='flex flex-col gap-1 max-md:mt-3 min-mid:ml-4'>
                                    <p className='font-playfair text-2xl'>
                                        {booking.hotel.name}
                                        <span className='font-inter text-sm'>({booking.room.roomType})</span>
                                    </p>
                                    <div className='flex items-center gap-1 text-sm text-gray-500'>
                                        <img src={assets.locationIcon} alt="location-Icon" />
                                        <span>{booking.hotel.address}</span>
                                    </div>
                                    <div className='flex items-center gap-1 text-sm text-gray-500'>
                                        <img src={assets.guestsIcon} alt="location-Icon" />
                                        <span>{booking.guests}</span>
                                    </div>
                                    <p className='text-base'>Total:${booking.totalPrice}</p>

                                </div>
                            </div>
                            {/* Date & Timing */}
                            <div className='flex flex-col items-start justify-center pt-3 gap-2'>
                                <p>Check-Out:</p>
                                <p className='className="text-gray-500 text-sm"'>
                                    {new Date(booking.checkOutDate).toDateString()}
                                </p>

                            </div>
                            {/* Payment Status */}
                            <div className='flex flex-col items-start justify-center pt-3 gap-2'>
                                <div className='flex items-center gap-2'>
                                    <div className={`h-3 w-3 rounded-full ${booking.isPaid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <p className={`text-sm ${booking.isPaid ? 'text-green-500' : 'text-red-500'}`}>{booking.isPaid ? 'Paid' : 'Not Paid'}</p>

                                </div>

                                {
                                    !booking.isPaid && (<button className='px-4 py-2 bg-orange-500 text-xs border border-gray-500 rounded-full mt-4 hover:bg-orange-50 transition-all cursor-pointer'>Pay Now</button>)
                                }
                            </div>

                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default MyBookings
