import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div className='flex items-center justify-between px-4 py-2 md:px-8 bg-white border-b border-gray-300 transition-all duration-300 '>
      <Link to='/'>
      <img src={assets.logo} alt="logo" className='h-9 invert opacity-80' />
      </Link>
    </div>
  )
}

export default NavBar
