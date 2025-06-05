import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Cart = () => {
  // This component will display the user's cart items
  // You can fetch cart items from the backend and display them here

  const {products, currency, cartItems, updateQuantity} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Fetch cart items from the backend or context
    const tempData = [];

    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          tempData.push({
            _id: item,
            size: size,
            quantity: cartItems[item][size],
            // product: products.find(product => product.id === item)
          });
        }
      }
    }
    setCartData(tempData);
    console.log(tempData);
  },[cartItems])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3 text-center font-bold'>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {
          cartData.map((product, index) => {
            const productData = products.find(item => item._id === product._id);
            {/* if (!productData) return null; // Skip if product not found */}

            return (
              <div className='py-4 border-t border-b text-gray-700 grid grid-cols-[4.5fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4' key={index}>
                <div className='flex items-center gap-4'>
                  <img src={productData.image[0]} alt="image" className='w-16 sm:w-20' />
                  <div>
                    <h3 className='text-xs sm:text-lg font-medium'>{productData.name}</h3>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{product.size}</p>
                    </div>
                  </div>
                </div>
                <input onClick={(e) => e.target.value === "" || e.target.value === "0" ? null : updateQuantity(product._id, product.size, Number(e.target.value))} className='border max-w-7 sm:max-w-14 max-h-10 mt-6 px-1 sm:px-2 text-center' type='number' min={1} defaultValue={product.quantity} />
                <img onClick={() => updateQuantity(product._id, product.size, 0)} src={assets.bin_icon} className='w-4 sm:w-5 mt-7 mr-5 cursor-pointer' />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cart