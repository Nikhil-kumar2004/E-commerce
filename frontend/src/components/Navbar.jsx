import { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
const NavBar = () => {

    const [visible,setVisible]=useState(false)
    const {setShowSearch}=useContext(ShopContext)

  return (
    <div className='flex items-center justify-between py-3 font-medium'>
        <Link to='/'>
            <img src={assets.logo} className='w-36' alt="" />
        </Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT US</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
            <div className='group relative'>
                <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                <div className='group-hover:block absolute hidden dropdown-menu hover right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-4 bg-stone-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p className='cursor-pointer hover:text-black'>Orders</p>
                        <p className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>
            </div>
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-6 min-w-6' alt="" />
                <p className='absolute right-[-3px] bottom-[-3px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
            </Link>
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>

        {/* For small screen - Sidebar Menu */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-1 p-3 cursor-pointer'>
                    <img src={assets.dropdown_icon} className='h-4 rotate-90' alt="" />
                    <p className='pb-[3px]'>Back</p>
                </div>
                <NavLink to='/' className='py-2 pl-6' onClick={()=>setVisible(false)}>HOME</NavLink>
                <hr />
                <NavLink to='/collection' className='py-2 pl-6' onClick={()=>setVisible(false)}>COLLECTION</NavLink>
                <hr />
                <NavLink to='/about' className='py-2 pl-6' onClick={()=>setVisible(false)}>ABOUT</NavLink>
                <hr />
                <NavLink to='/contact' className='py-2 pl-6' onClick={()=>setVisible(false)}>CONTACT</NavLink>
            </div>
        </div>
    </div>
  )
}

export default NavBar
