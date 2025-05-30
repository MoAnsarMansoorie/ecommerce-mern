import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    // This component will handle the search functionality
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("collection")) {
            setVisible(true);
        }
        else {
            setVisible(false);
        }

        // console.log(location.pathname);
    }, [location]);

    return showSearch && visible  ? (
        <div className='border-t border-b bg-gray-50 text-center'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-auto rounded-full w-3/4 sm:w-1/2'>
                <input
                    type='text'
                    placeholder='Search for products...'
                    className='flex-1 outline-none bg-transparent text-sm sm:text-base'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <img
                    className='w-4'
                    src={assets.search_icon}
                    alt='Search Icon'
                />
            </div>

            <img
                className='inline w-3 ml-1 cursor-pointer'
                src={assets.cross_icon}
                alt='Close Search'
                onClick={() => setShowSearch(false)}
            />
        </div>
    ) : null;
}

export default SearchBar;
