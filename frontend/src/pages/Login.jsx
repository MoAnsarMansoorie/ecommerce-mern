import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up")

  const submitHandler = (e) => {
    e.preventDefault()
    // Here you would typically handle the form submission, e.g., send data to the server
    console.log("Form submitted")
    // Reset the form or handle success/failure as needed
    e.target.reset()
  }

  return (
    <form onSubmit={submitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === "LogIn" ? "" : <input type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input type='email' className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input type='password' className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
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