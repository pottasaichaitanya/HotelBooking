import { useParams } from 'react-router-dom'
import { use, useEffect, useState } from 'react'
import { facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
import Star from '../components/Star'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'
const RoomDetails = () => {
    const { id } = useParams()
    const { rooms, navigate, axios, getToken } = useAppContext();
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)

    const [isAvailable, setIsAvailable] = useState(false);

    const checkAvailability = async () => {
        try {
            if (formik.values.checkInDate >= formik.values.checkOutDate) {
                toast.error("Check-out date must be after check-in date");
                return;
            }
            const { data } = await axios.post('/api/booking/check-availability', { room: id, checkInDate: formik.values.checkInDate, checkOutDate: formik.values.checkOutDate });
            if (data.success) {
                setIsAvailable(data.isAvailable);
                if (data.isAvailable) {
                    console.log("Room is available for the selected dates");
                    toast.success("Room is available for the selected dates");
                } else {
                    toast.error("Room is not available for the selected dates");
                }
            }
        }
        catch (error) {
            console.error("Error checking availability:", error);
            toast.error(error.message || "Something went wrong");
        }
    }
    const formik = useFormik({
        initialValues: {
            checkInDate: '',
            checkOutDate: '',
            guests: 1,
        },
        onSubmit: async (values) => {
            try {
                if (!isAvailable) {
                    toast.error("Room is not available for the selected dates");
                    return checkAvailability();
                }
                else {
                    const { data } = await axios.post('/api/booking/booking', {
                        room: id,
                        checkInDate: formik.values.checkInDate,
                        checkOutDate: formik.values.checkOutDate,
                        guests: formik.values.guests
                    }, { headers: { Authorization: `Bearer ${await getToken()}` } });
                    if (data.success) {
                        toast.success("Booking created successfully");
                    }
                    else{
                        toast.error(data.message || "Something went wrong");
                    }
                } }
                catch (error) {
                    console.error("Error checking availability:", error);
                }
            }
});



    useEffect(() => {
        const foundRoom = rooms.find((room) => room._id === id)
        foundRoom && setRoom(foundRoom)
        foundRoom && setMainImage(foundRoom.images[0])
    }, [rooms])


    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32 gap-8'>
            {/* room details */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl font-playfair'>
                    {room.hotel.name}<span className='font-inter text-sm'>({room.roomType})</span>
                </h1>
                <p className='text-xs font-inter py-1.5 px-3 text-sm bg-orange-500 rounded-full'>20 % OFF </p>
            </div>
            {/* room rating */}
            <div className='flex items-center gap-2'>
                <Star />
                <p className='ml-2'>200 + reviews</p>
            </div>
            {/* room address */}
            <div className='flex items-center gap-1 text-gray-500 mt-2'>
                <img src={assets.locationIcon} alt="location" />
                <span>{room.hotel.address}</span>
            </div>
            {/* room images */}
            <div className='flex flex-col lg:flex-row gap-4 mt-6'>
                <div className='lg:w-1/2 w-full'>
                    <img src={mainImage} alt="room" className='w-full shadow-lg object-cover rounded-xl' />
                </div>
                <div>{room?.images.length > 1 && room.images.map((image, index) => (
                    <img onClick={() => setMainImage(image)} key={index} src={image} alt={`room-${index}`} className={`w-full h-32 object-cover rounded-xl shadow-md object-cover  cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`} />
                ))}</div>
            </div>
            {/* room Highlights */}
            <div className='flex flex-col md:flex-row md:justify-between mt-10'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-xl md:text-xl font-playfair'>Experience Luxury Never Before</h1>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {room.amenities.map((amenity, index) => (
                            <div key={index} className='flex items-center gap-2 py-5 px-5 rounded-lg bg-gray-100'>
                                <img src={facilityIcons[amenity]} alt={amenity} className='w-5 h-5' />
                                <p className='text-xs'>
                                    {amenity}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* room price */}
                <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>

            </div>
            {/* check in check out */}
            <form onSubmit={formik.handleSubmit} className='flex flex-col flex-wrap md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_opx_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                    <div className='flex flex-col '>
                        <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
                        <input name="checkInDate" onChange={formik.handleChange} value={formik.values.checkInDate} type="date" id="checkInDate" placeholder='Check-In' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col '>
                        <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                        <input name="checkOutDate" onChange={formik.handleChange} value={formik.values.checkOutDate} min={formik.values.checkInDate} disabled={!formik.values.checkInDate} type="date" id="checkOutDate" placeholder='Check-Out' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col '>
                        <label htmlFor="guests" className='font-medium'>Guests</label>
                        <input name="guests" onChange={formik.handleChange} value={formik.values.guests} type="number" id="guests" placeholder='0' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                </div>
                <button type='submit' className='bg-primary hover:bgprimary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>{isAvailable ? "Book now" : "Not Available"}</button>
            </form>

            {/* common specifications */}
            <div>
                {roomCommonData.map((spec, index) => (
                    <div key={index} className='flex items-start gap-2'>
                        <img src={spec.icon} alt="icon" className='w-6.5' />
                        <div>
                            <p className='text-base'>{spec.title}</p>
                            <p className='text-gray-500'>{spec.description}</p>

                        </div>

                    </div>
                ))}
            </div>
            <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
                <p >
                    Guests will be allocated on the ground floor according to availability. You get a comfortable two-bedroom apartment that has a true city feeling. The price quoted is for two guests; at the guest slot, please mark the number of guests to get the exact price for groups.
                </p>

            </div>
            {/* Hosted by */}
            <div className='flex flex-col items-start gap-4 mt-10'>
                <div className='flex gap-4'>
                    <img src={room.hotel.owner.image} alt="Host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
                    <div>
                        <p className='text-lg md:text-xl'>Hosted by{room.hotel.name}</p>
                        <div className='flex items-center gap-2'>
                            <Star />
                            <p className='ml-2'>200+ reviews</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RoomDetails
