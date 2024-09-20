import React from 'react'

export default function page() {
  return (
    <div className='w-full h-screen flex flex-col py-10 px-6'>
      <h1 className='uppercase text-[4.5rem] leading-none font-sans font-light text-black text-center'>Choose how to collect the goods</h1>
      <div className="mt-12 px-12 grid grid-cols-2 gap-[2.25rem] min-h-[25rem] w-full">
        <div className="bg-violet w-full px-7 rounded-xl py-[2.375rem] flex flex-col justify-end items-start space-y-11">
            <img
            className="h-20 w-auto invert object-contain"
            src="/images/shop.svg"
            alt="shop"
            /> 
            <h3 className='uppercase text-[2.5rem] font-sans font-light text-white leading-none'>Home delivery</h3>
        </div>
        <div className="bg-violet w-full rounded-xl px-7 py-[2.375rem] flex flex-col justify-end items-start space-y-11">
            <img
            className="h-20 w-auto invert object-contain"
            src="/images/shop.svg"
            alt="shop"
            />
            <h3 className='uppercase text-[2.5rem] font-sans font-light text-white leading-none'>Pick-up in store</h3>
        </div>
       </div>
       <div className="flex flex-col px-12 mt-12">
        <p className='uppercase text-center text-[2.125rem] font-sans font-light leading-none mb-6'>We need your email</p>
        <input type="mail" id="site-mail" name="mail" placeholder="insert a valid email " className='outline-none ring-0 rounded-[0.125rem] text-[1.0625rem] w-full py-4 pl-6 pr-20 bg-gray-200 text-gray-400'/>
        <button className="mx-auto mt-14 text-white uppercase leading-none rounded-[0.25rem] bg-violet-100 text-[3.625rem] font-light font-sans py-4 px-6">Pay now</button>
       </div>
    </div>
  )
}