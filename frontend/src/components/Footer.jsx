import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-4 my-10 mt-40 text-sm text-gray-700">

        <div>
            <img src={assets.logo} alt="Logo" className="w-32 mb-5" />
            <p className="text-xs sm:text-sm md:text-base text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Rerum nisi doloribus deserunt voluptatibus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Rerum nisi doloribus deserunt voluptatibus.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>                
        </div>


        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91-987-654-3210</li>
                <li>contact@clothing.com</li>
            </ul>                
        </div>

      </div>

      <div>
        <hr />
        <p className='text-center text-xs sm:text-sm md:text-base text-gray-500 py-5'>
          &copy; {new Date().getFullYear()} Clothing Store. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;

