import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='w-full h-screen flex flex-col p-8 px-4'>
      <h1 className='uppercase text-[4.375rem] leading-none font-sans font-light text-black text-center'>You may also like</h1>
      <button className='ml-auto inline-flex items-center space-x-4 mt-[7.125rem] mr-8'>
        <span className="font-sans font-light uppercase text-[1.625rem] leading-none">Swipe items</span>
        <img
            className="h-8 w-auto object-contain"
            src="/images/change.svg"
            alt="change"
            /> 
      </button>
      <div className="mt-14 grid grid-cols-3 gap-x-[3.5rem] gap-y-10 w-full">
        <div className="flex flex-col items-center space-y-3">
            <img
            className="h-[10rem] w-auto object-contain"
            src="/images/t-shirt.jpeg"
            alt="shop"
            /> 
            <h3 className='text-[1.75rem] text-center font-sans font-light text-black leading-none'>nome prodotto</h3>
            <h5 className='text-[1.75rem] text-center font-sans font-medium text-black leading-none mt-2'>$19.90</h5>
            <button className="mx-auto text-white uppercase text-centerleading-none rounded-[0.25rem] bg-violet text-[1.5rem] font-light font-sans py-1 px-2 w-full">Add to cart</button>
            <button className="-mt-1 mx-auto text-white uppercase text-centerleading-none rounded-[0.25rem] bg-gray-400 text-[1.5rem] font-light font-sans py-1 px-2 w-full">Details</button>
        </div>
        <div className="flex flex-col items-center space-y-3">
            <img
            className="h-[10rem] w-auto object-contain"
            src="/images/t-shirt.jpeg"
            alt="shop"
            /> 
            <h3 className='text-[1.75rem] text-center font-sans font-light text-black leading-none'>nome prodotto</h3>
            <h5 className='text-[1.75rem] text-center font-sans font-medium text-black leading-none mt-2'>$19.90</h5>
            <button className="mx-auto text-white uppercase text-centerleading-none rounded-[0.25rem] bg-violet text-[1.5rem] font-light font-sans py-1 px-2 w-full">Add to cart</button>
            <button className="-mt-1 mx-auto text-white uppercase text-centerleading-none rounded-[0.25rem] bg-gray-400 text-[1.5rem] font-light font-sans py-1 px-2 w-full">Details</button>
        </div>
        <div className="flex flex-col items-center space-y-3">
            <img
            className="h-[10rem] w-auto object-contain"
            src="/images/t-shirt.jpeg"
            alt="shop"
            /> 
            <h3 className='text-[1.75rem] text-center font-sans font-light text-black leading-none'>nome prodotto</h3>
            <h5 className='text-[1.75rem] text-center font-sans font-medium text-black leading-none mt-2'>$19.90</h5>
            <button className="mx-auto text-white uppercase text-centerleading-none rounded-[0.25rem] bg-violet text-[1.5rem] font-light font-sans py-1 px-2 w-full">Add to cart</button>
            <button className="-mt-1 mx-auto text-white uppercase text-centerleading-none rounded-[0.25rem] bg-gray-400 text-[1.5rem] font-light font-sans py-1 px-2 w-full">Details</button>
        </div>
      </div>
      <Link className="mx-auto mt-[11.25rem] text-center text-white uppercase leading-none rounded-[0.25rem] bg-violet-100 text-[3.625rem] font-light font-sans py-4 px-6" href={`/step-6`}>Skip and proceed</Link>
    </div>
  )
}