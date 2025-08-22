import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
const NavBar = () => {

    const [visible, setVisible] = useState(false)
    const { search,setSearch, getCartCount, token, navigate, setToken, setCartItems } = useContext(ShopContext)

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }
    return (
        <div className='flex items-center justify-between py-3 font-medium'>
            <Link to='/'>
                <img src={assets.logo} className='w-36' alt="" />
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT US</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                <div className="flex items-center justify-between text-gray-600 border px-6 py-1 rounded-full cursor-pointer w-64">
                    <input
                        value={search}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setSearch(e.target.value);
                            }
                        }}
                        type="text"
                        placeholder="Search"
                        className="flex-1 outline-none bg-transparent text-sm px-2"
                    />
                    <img
                        src={assets.search_icon}
                        alt="search"
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => {
                            console.log("Searching for:", search);
                        }}
                    />
                </div>
                <div className='group relative z-50'>
                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className="w-7 h-7 p-0.5 rounded-full border cursor-pointer" alt="" />
                    {
                        token && <div className='group-hover:block absolute hidden dropdown-menu hover right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-4 bg-stone-100 text-gray-500 rounded'>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={() => logout()} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className="w-7 h-7 p-0.5 rounded-full border cursor-pointer" alt="" />
                    <p className='absolute right-[-3px] bottom-[-3px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* For small screen - Sidebar Menu */}
            <div className={`fixed top-0 right-0 bottom-0 bg-white transition-all duration-500 ease-in-out z-50 ${visible ? 'w-3/4 sm:w-1/3 shadow-lg' : 'w-0'
                }`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-1 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-90' alt="" />
                        <p className='pb-[3px]'>Back</p>
                    </div>
                    <NavLink to='/' className='py-2 pl-6' onClick={() => setVisible(false)}>HOME</NavLink>
                    <hr />
                    <NavLink to='/collection' className='py-2 pl-6' onClick={() => setVisible(false)}>COLLECTION</NavLink>
                    <hr />
                    <NavLink to='/about' className='py-2 pl-6' onClick={() => setVisible(false)}>ABOUT</NavLink>
                    <hr />
                    <NavLink to='/contact' className='py-2 pl-6' onClick={() => setVisible(false)}>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default NavBar
