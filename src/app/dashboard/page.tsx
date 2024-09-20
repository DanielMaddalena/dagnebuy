import React from 'react'

export default function page() {
  return (
    <div className='w-full h-screen flex flex-col space-y-6 items-center justify-center'>
        <h1 className='uppercase text-[4.5rem] font-sans font-light text-black text-center'>Touch the screen to start buying</h1>
       <img
          className="w-[9rem] h-auto object-contain"
          src="/images/logo.png"
          alt="Logo"
        /> 
    </div>
  )
}