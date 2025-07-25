import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up")
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault()
    // Here you would typically handle the form submission, e.g., send data to the server
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/v1/user/register`, {name, email, password} )
        console.log(response.data)
        if (response.data.success) {
          toast.success(response.data.message);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
        
      } else {
        const response = await axios.post(`${backendUrl}/api/v1/user/login`, {email, password} )
        console.log(response.data)
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
        
      }
       
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("An error occurred. Please try again.");
      
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token])

  return (
    <form onSubmit={submitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === "LogIn" ? "" : <input value={name} onChange={(e) => setName(e.target.value)} type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='flex w-full justify-between text-sm mt-[-8px]'>
        <p className='text-red-400 cursor-pointer' >Forgot Password</p>
        {
          currentState === "LogIn" ? 
          <p className='text-gray-800 cursor-pointer' onClick={() => setCurrentState("Sign Up")}>Create an account</p> : 
          <p className='text-gray-800 cursor-pointer' onClick={() => setCurrentState("LogIn")}>Already have an account?</p>
        }
      </div>
      <button className='bg-black text-white font-light px-4 py-2 mt-4'>
        {
          currentState === "LogIn" ? "Log In" : "Sign Up"
        }
      </button>
    </form>
  )
}

export default Login