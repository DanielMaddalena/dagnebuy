'use client'

import useCommerce from '@/contexts/useCommerce';
import React, { useCallback, useEffect, useState } from 'react'
import Product from '@/@types/product'

export default function page() {
    const { getProducts } = useCommerce()
    const [products, setProducts] = useState<Product[]>([])
  
    const getData = useCallback(async () => {
      const data = await getProducts()
      setProducts(data)
    }, [getProducts])
  
    useEffect(() => {
      getData()
    }, [])

  return (
    <div className='w-full h-screen flex flex-col p-8 px-11'>
        <h1 className='uppercase text-[4.375rem] leading-none font-sans font-light text-black text-center'>Final review</h1>
        <div className="divide-black divide-y-2 mt-16">
            <div className="flex items-start justify-between py-4">
                <div className="flex flex-col">
                    <h3 className="font-sans font-light uppercase text-[2.0625rem] leading-none max-w-[19rem]">Nome prodotto xs blue</h3>
                    <h5 className='text-[1.75rem] font-sans font-medium text-black leading-none mt-2'>$19.90</h5>
                </div>
                <button className='ml-auto'>
                    <img
                        className="h-12 w-auto object-contain"
                        src="/images/delete.svg"
                        alt="delete"
                    /> 
                </button>
            </div>
            <div className="flex items-start justify-between py-4">
                <div className="flex flex-col">
                    <h3 className="font-sans font-light uppercase text-[2.0625rem] leading-none max-w-[19rem]">Nome prodotto</h3>
                    <h5 className='text-[1.75rem] font-sans font-medium text-black leading-none mt-2'>$19.90</h5>
                </div>
                <button className='ml-auto'>
                    <img
                        className="h-12 w-auto object-contain"
                        src="/images/delete.svg"
                        alt="delete"
                    /> 
                </button>
            </div>
            <div className="flex items-start justify-between py-4">
                <div className="flex flex-col">
                    <h3 className="font-sans font-light uppercase text-[2.0625rem] leading-none max-w-[19rem]">Nome prodotto xs blue</h3>
                    <h5 className='text-[1.75rem] font-sans font-medium text-black leading-none mt-2'>$19.90</h5>
                </div>
                <button className='ml-auto'>
                    <img
                        className="h-12 w-auto object-contain"
                        src="/images/delete.svg"
                        alt="delete"
                    /> 
                </button>
            </div>
            <div className="flex items-start justify-between py-4">
                <div className="flex flex-col">
                    <h3 className="font-sans font-light uppercase text-[2.0625rem] leading-none max-w-[19rem]">Nome prodotto xl red</h3>
                    <h5 className='text-[1.75rem] font-sans font-medium text-black leading-none mt-2'>$19.90</h5>
                </div>
                <button className='ml-auto'>
                    <img
                        className="h-12 w-auto object-contain"
                        src="/images/delete.svg"
                        alt="delete"
                    /> 
                </button>
            </div> 
        </div>
        <img
            className="h-20 mt-5 w-auto object-contain"
            src="/images/double-arrows-down.svg"
            alt="search"
            />
        <p className='mt-8 uppercase text-[2.06125rem] leading-none font-sans font-medium text-black text-center'>Total to pay for 6 items: $113.40</p>
        <button className="mx-auto mt-12 text-white uppercase leading-none rounded-[0.25rem] bg-violet-100 text-[3.625rem] font-light font-sans py-4 px-6">Confirm</button>
    </div>
  )
}