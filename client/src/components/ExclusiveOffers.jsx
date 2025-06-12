import React from 'react'
import { assets, exclusiveOffers } from '../assets/assets'
import Title from './Title'
const ExclusiveOffers = () => {
  return (
    <div className='flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20 '>
      <div className='flex flex-col items-center justify-between w-full'>
        <Title align='left' title="Exclusive Offers" subtitle="Don't miss out on our exclusive offers and discounts." />
      <button>
        View all Offers
        <img src={assets.arrowIcon} alt="arrow-icon" className='group-hover:translate-x-1 transition-all '/>
      </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 '>
        {exclusiveOffers.map((item,index)=>(
            <div key={item._id} className='group relative flex flex-xol items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-ehite bg-no-repeat bg-cover bg-center' style={{backgroundImage:`url(${item.image})`}}>
                <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full'>{item.priceOff}% OFF</p>
                <div>
                    <p className='text-2xl  font-playfair font-medium '>{item.title}</p>
                    <p>{item.description}</p>
                    <p className='text-xs  text-white/90 mt-3'>{item.expiryDate}</p>
                </div>


            </div>

        ))}
      </div>
    </div>
  )
}

export default ExclusiveOffers
 