import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const [method, setMethod] = useState("cod")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []

      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[items][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {

        // API calls for cod
        case "cod":
          try {
            // Optionally show a loading indicator here
            const response = await axios.post(
              `${backendUrl}/api/v1/order/placeorder`,
              orderData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log("Order response:", response.data);
            if (response.data.success) {
              console.log("Order placed successfully:", response.data);
              toast.success("Order placed successfully!");
              setCartItems({});
              navigate("/orders");
            } else {
              toast.error(response.data.message || "Failed to place order. Please try again.");
            }
          } catch (error) {
            console.error("Order placement error:", error);
            toast.error(
              error.response?.data?.message ||
              error.message ||
              "Failed to place order. Please try again."
            );
          }
          break;
        
        default:
          break;  
      }
      
    } catch (error) {
      console.error("Error placing order:", error)
      alert("Failed to place order. Please try again.")
      
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-20 pt-4 sm:pt-14 min-h-[80vh] border-t'>

      {/* --------------LEFT SIDE---------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className='flex gap-3'>
          <input name='firstName' value={formData.firstName} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First Name' />
          <input name='lastName' value={formData.lastName} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last Name' />
        </div>
        <input name='email' value={formData.email} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email Address' />
        <input name='street' value={formData.street} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />
        <div className='flex gap-3'>
          <input name='city' value={formData.city} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
          <input name='state' value={formData.state} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input name='zipcode' value={formData.zipcode} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='ZipCode' />
          <input name='country' value={formData.country} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
        </div>
        <input name='phone' value={formData.phone} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='PhoneNumber' />

      </div>

      {/* ------------------Right Side---------------- */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* PAYMENT METHOD SELECTION */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod("stripe")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} />
            </div>

            <div onClick={() => setMethod("razorpay")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} />
            </div>

            <div onClick={() => setMethod("cod")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full mt-8 text-end'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>Place Order</button>
          </div>

        </div>

      </div>
    </form>
  )
}

export default PlaceOrder