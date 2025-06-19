
import { useEffect,useState } from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
const RecommendedHotels = () => {
    const { rooms, searchedCities, navigate } = useAppContext();
    const [recommended, setRecommended] = useState([]);
    const filterHotels = () => {
        const filteredHotels = rooms.slice().filter(room => {
            return searchedCities.includes(room.hotel.city);
        });
        setRecommended(filteredHotels);
    }
    useEffect(() => {         
            filterHotels();
        }, [rooms, searchedCities]);

    return recommended.length > 0 && (
        <div className='flex flex-col items-center justify-center px-6 md:px-16 lg:px-24  bg-slate-50 py-20'>
            <Title title="Recommended Hotels" subtitle="Explore and handpick  the best places around the world to stay,offering luxury and unforgettable experiences." />
            <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
                {recommended.slice(0, 4).map((room, index) => (
                    <HotelCard key={index} room={room} />
                ))}
            </div>
            <button onClick={() => { navigate('/rooms'); scrollTo(0, 0) }} className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
                View All Destinations</button>
        </div>
    )
}

export default RecommendedHotels;
