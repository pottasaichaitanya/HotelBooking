import React, { useState, useEffect } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'

const HotelReg = () => {

    const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();
    const formik = useFormik({
        initialValues: {
            name: '',
            contact: '',
            address: '',
            city: ''
        },
        onSubmit: async (values) => {
            try {
               
                const token = await getToken();
                if (!token) throw new Error('Authentication token not found');
                if (!axios) throw new Error('Axios instance not available');
                
                const { data } = await axios.post('/api/hotel/', values, {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`
                    }
                });
                if (data.success) {
                    toast.success(data.message);
                    setIsOwner(true);
                    setShowHotelReg(false);
                }
                else{
                    toast.error(data.message);
                }
            }
            catch (err) {
                console.error('Submission error:', err);
                toast.error(err);
            }

        }
    });

    return (
        <div onClick={() => setShowHotelReg(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
            <form onSubmit={formik.handleSubmit} onClick={(e) => { e.stopPropagation() }} className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
                <img src={assets.regImage} alt="reg-Image" className='w-1/2 h-auto rounded-l-xl hidden md:block' />
                <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
                    <img src={assets.closeIcon} alt="close-icon" className='absolute top-4 right-4 w-4 h-4 cursor-pointer' onClick={() => setShowHotelReg(false)} />
                    <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>
                    {/* Hotel name */}
                    <div className='w-full mt-4'>
                        <label htmlFor="name" className='font-medium text-gray-500'>Hotel Name</label>
                        <input id='name' name='name' onChange={formik.handleChange} value={formik.values.name} type="text" placeholder='Type here' className='border border-gray-300 rounded w-full px-3 py-2.5 outline-indigo-500 font-light' required />

                    </div>
                    {/* Phone number */}
                    <div className='w-full mt-4'>
                        <label htmlFor="contact" className='font-medium text-gray-500'>Phone Number</label>
                        <input id="contact" name='contact' onChange={formik.handleChange} value={formik.values.contact} type="text" placeholder='Type here' className='border border-gray-300 rounded w-full px-3 py-2.5 outline-indigo-500 font-light' required />

                    </div>
                    {/* Address */}
                    <div className='w-full mt-4'>
                        <label htmlFor="address" className='font-medium text-gray-500'>Address</label>
                        <input id="address" name='address' onChange={formik.handleChange} value={formik.values.address} type="text" placeholder='Type here' className='border border-gray-300 rounded w-full px-3 py-2.5 outline-indigo-500 font-light' required />

                    </div>
                    {/* Select City Dropdown */}
                    <div className='w-full mt-4'>
                        <label htmlFor="city" className='font-medium text-gray-500'>City</label>
                        <select id="city" name='city' onChange={formik.handleChange} value={formik.values.city} className='border border-gray-300 rounded w-full px-3 py-2.5 outline-indigo-500 font-light' required >
                            <option value="">Select City</option>
                            {cities.map((city,index) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>

                    </div>
                    <button type='submit' className='bg-indigo-500 text-white px-6 py-2.5 rounded-full mt-6 hover:bg-orange-600 transition-all cursor-pointer'>Register</button>

                </div>

            </form>

        </div>
    )
}

export default HotelReg
