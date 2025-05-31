import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'; // Adjust the import path as necessary
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();  // Here you can fetch product details using the productId
  const { products, currency } = useContext(ShopContext); // Assuming you have a ShopContext that provides products
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id == productId) {
        setProductData(item);
        setImage(item.image[0]); // Assuming the image is an array and you want the first image
        return null; // Exit the map early once the product is found
      }
    })

  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity duration-500 ease-in opacity-100'>
      {/* ---------------------Product data------------------ */}
      <div className='flex flex-col sm:flex-row gap-12 sm:gap-12'>

        {/* ------------------Product Image--------------------- */}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
          {/* ------------------small image------------------- */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)} // Set the clicked image as the main image
                alt={`Product image ${index + 1}`}
                key={index}
                src={item}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer '
              />
            ))}
          </div>
          {/* --------------large image---------------------- */}
          <div className='w-full sm:w-[81.3%]'>

            <img
              src={image}
              className='w-full h-auto'
            />

          </div>
        </div>

        {/* ------------------Product details--------------------- */}
        <div className='flex-1'>
          <h1 className='text-2xl font-medium mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-2 my-2'>
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className='pl-2'>122</p>
          </div>
          <p className='mt-5 font-medium text-2xl'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-3'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)} // Set the selected size
                  disabled={size === item} // Disable the button if it's already selected
                  key={index}
                  className={`border bg-gray-100 px-4 py-2 ${item === size ? "border-orange-500" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className='bg-black text-white px-8 py-2 text-sm active:bg-gray-700'>ADD TO CART</button>
            <hr className='mt-5 sm:w-4/5' />
            <div className='flex flex-col text-gray-500 mt-5 text-sm gap-1'>
              <p>100% original product.</p>
              <p>Cash on delivery available on this product.</p>
              <p>Easy retun and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>

      </div>

      {/* ---------------Description and review section-------------------- */}
      <div className='mt-20'>
        <div className='flex items-center gap-2'>
          <p className='border px-3 py-2 text-sm'>Description</p>
          <p className='border px-3 py-2 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-700'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus architecto impedit assumenda facilis nostrum, porro quia veritatis praesentium quibusdam facere, suscipit rem itaque optio corrupti laudantium voluptas. Molestiae, officiis asperiores? Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat modi asperiores animi ducimus neque ea.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo dolore, quia, assumenda voluptates ratione ullam odio aliquam porro sint amet nostrum rem nihil nesciunt saepe? Dolor consequuntur odio a ducimus.</p>
        </div>
      </div>

      {/* ------------Display related products------------ */}
      {/* <div className='mt-20'>
        <h1 className='text-2xl font-medium'>Related Products</h1>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
          {products.slice(0, 8).map((item) => (
            <div key={item._id} className='border p-4 rounded-lg hover:shadow-lg transition-shadow duration-300'>
              <img src={item.image[0]} alt={item.name} className='w-full h-auto mb-4' />
              <h2 className='text-lg font-semibold'>{item.name}</h2>
              <p className='text-gray-500'>{currency}{item.price}</p>
            </div>
          ))}
        </div>
      </div>  Thios is AI generated code */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />


    </div>
  ) : (
    <div className='opacity-0'>
      <h1>Loading...</h1>
      <p>Please wait while we fetch the product details.</p>
    </div>
  )
}

export default Product