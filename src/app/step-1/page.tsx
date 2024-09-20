import React from 'react'

export default function page() {
  return (
    <div className='w-full h-screen flex flex-col py-10 px-[4.25rem]'>
      <h1 className='uppercase text-[4.5rem] font-sans font-light text-black text-center'>WHAT DO YOU<br/>WANT TO BUY?</h1>
      <div className="mt-[9.5rem] grid grid-cols-2 gap-[2.25rem] min-h-[25rem] w-full">
        <div className="bg-violet w-full px-7 rounded-xl py-[2.375rem] flex flex-col justify-end items-start space-y-11">
            <img
            className="h-20 w-auto invert object-contain"
            src="/images/shop.svg"
            alt="shop"
            /> 
            <h3 className='uppercase text-[2.5rem] font-sans font-light text-white leading-none'>PRODUCTS IN WINDOW NOW</h3>
        </div>
        <div className="bg-violet w-full rounded-xl px-7 py-[2.375rem] flex flex-col justify-end items-start space-y-11">
            <img
            className="h-20 w-auto invert object-contain"
            src="/images/shop.svg"
            alt="shop"
            />
            <h3 className='uppercase text-[2.5rem] font-sans font-light text-white leading-none'>OTHER ITEMS FROM CATALOGUE</h3>
        </div>
       </div>
    </div>
  )
}