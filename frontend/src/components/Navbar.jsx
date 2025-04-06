import React, { useState } from 'react'
import { assets } from "../assets/assets"
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {

    const [visible, setVisible] = useState(false)


    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <img src={assets.logo} alt="Logo" className='w-36' />

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <img src={assets.search_icon} className='w-5 cursor-pointer' />

                <div className='group relative'>
                    <img src={assets.profile_icon} className='w-5 cursor-pointer' />
                    <div className='group-hover:block hidden absolute right-0 pt-4 dropdown-menu'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-4 bg-slate-100 text-gray-500 rounded-lg'>
                            <p className='cursor-pointer hover:text-black'>Profile</p>
                            <p className='cursor-pointer hover:text-black'>Orders</p>
                            <p className='cursor-pointer hover:text-black'>LogOut</p>
                        </div>
                    </div>
                </div>

                <Link to="/cart" className="relative">
                    <img src={assets.cart_icon} className='w-5 min-w-5' />
                    <div className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]'>2</div>
                </Link>
                
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' />
            </div>

            {/* sidebar menu for mobile screen */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden transition-all ${visible ? 'w-full' : 'w-0'} bg-slate-100 z-50`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3'>
                        <img src={assets.dropdown_icon} alt="Logo" className='h-4 rotate-180' />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">Collection</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">About</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">Contact</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar