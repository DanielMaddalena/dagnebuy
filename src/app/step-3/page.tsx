'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useCommerce from '@/contexts/useCommerce'
import Product from '@/@types/product'
import Link from 'next/link'
import useSwell from "@/contexts/useSwell"

export default function page() {
  const { getProducts } = useSwell()
  const [products, setProducts] = useState<Product[]>([])

  const getData = useCallback(async () => {
    const data = await getProducts()
    setProducts(data)
  }, [getProducts])

  useEffect(() => {
    getData()
  }, [])

  // Esegui il recupero dei dati quando il componente viene montato
  useEffect(() => {
    getData();
  }, [getData]);

  return (
      <div className='w-full h-screen flex flex-col py-8 px-4'>
        <h1 className='uppercase text-[4.375rem] leading-none font-sans font-light text-black text-center'>Browse catalogue</h1>
        <div className="relative mt-5">
          <input type="search" id="site-search" name="search" placeholder="search products" className='outline-none ring-0 rounded-[0.75rem] text-[1.0625rem] w-full py-4 pl-6 pr-20 bg-gray-200 text-gray-400'/>
          <img
              className="absolute right-6 top-1/2 -translate-y-1/2 h-6 w-auto object-contain"
              src="/images/search.svg"
              alt="search"
              /> 
        </div>
        <div className="mt-4 grid grid-cols-3 gap-x[3.5rem] gap-y-10 w-full">
        {products.map(el => (
          <Link href={`step-4/${el.id}`} key={el.id} className="flex flex-col items-center space-y-3">
            <img className="h-[10rem] w-auto object-cover" src={el.images[0]?.file?.url ?? ''} alt={el.name} /> 
            <h3 className='text-[1.75rem] text-center font-sans font-light text-black leading-none'>{el.name}</h3>
            <h5 className='text-[1.75rem] text-center font-sans font-medium text-black leading-none mt-2'>{el.price?.formatted_with_code ?? ''}</h5>
            <button className="mx-auto text-white uppercase leading-none rounded-[0.25rem] bg-violet text-[1.5rem] font-light font-sans py-4 px-3 min-w-[7.75rem]">Go</button>
          </Link>  
        ))}
        </div>
        <button className='flex flex-col items-center mt-14'>
          <p className='uppercase text-[1.875rem] leading-none font-sans font-light text-black text-center'>Load more</p>
          <img
              className="h-20 w-auto object-contain"
              src="/images/double-arrows-down.svg"
              alt="arrow"
              /> 
        </button>
      </div>
    
  )
}

