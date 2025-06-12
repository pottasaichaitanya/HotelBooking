import React from 'react'
import { testimonials} from '../assets/assets'
import Star from './Star'
import { useState, useEffect } from 'react'
import Title from './Title'
const Testimonial = () => {
  return (
    <div>
      <Title title='What Our Guests Say' subtitle='Discover the experiences of our satisfied guests about the Quick Stay for thier exclusive and luxurious accommodations around the worls.' />
      <div className="flex flex-wrap items-center justify-center  gap-6 mt-20 mb-10">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-xs">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            
                                <Star />
                         
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Testimonial
