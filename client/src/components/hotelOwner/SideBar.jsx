import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const SideBar = () => {
    const sidebarLinks=[
        {name:'Dashboard',path:'/owner',icon:assets.dashboardIcon},
        {name:"Add Room", path:'/owner/add-room',icon:assets.addIcon},
        {name:"List Room",path:'/owner/list-room',icon:assets.listIcon},
    ]
  return (
    <div className='md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300'>
      {sidebarLinks.map((item,index) => {
        return (
     <NavLink to={item.path} key={index} end='/owner' className={({isActive})=>`flex items-center gap-2 px-4 py-2 md:px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 ${isActive ? 'border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600' : 'hover:bg-gray-100/90 border-white text-gray-700'}`}>
       <img src={item.icon} alt={item.name} className='w-6 h-6 md:w-7 md:h-7' />
       <p className='md:block hidden text-center'>{item.name}</p>

     </NavLink>
        )
        
      })}
    </div>
  )
}

export default SideBar
