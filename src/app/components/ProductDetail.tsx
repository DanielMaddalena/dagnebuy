'use client'
import React, { useCallback, useEffect } from 'react'
import CounterComponent from './CounterComponent'
import { Product } from '@chec/commerce.js/types/product'
// import { useCart } from '@/contexts/useCart'
import useCommerce from '@/contexts/useCommerce'
import Image from 'next/image';
import Link from 'next/link'

/* devo specificare che product è del tipo Product perchè siamo passati da un componente all'altro,
in questo modo typescript capisce
*/

export default function ProductDetail({ product }: { product: Product }) {
  // const { setItems } = useCart()

  // const addToCart = useCallback(() => {
  //   setItems(prev => [...prev, product])
  // }, [product])
  const { addToCart } = useCommerce(); // Usa l'hook useCommerce qui

  // Qui utilizziamo addToCart da useCommerce per aggiungere al carrello di Commerce.js
  const handleAddToCart = useCallback(async () => {
    // Assumi che CounterComponent fornisca la quantità selezionata. 
    // Dovresti avere un modo per ottenere questa quantità dal componente CounterComponent.
    const quantity = 1; // Questo è un placeholder, sostituiscilo con il valore reale
    await addToCart(product.id, quantity);
    // Aggiungi qui eventuali azioni post-aggiunta, come un feedback visivo
  }, [product, addToCart]);

  return (
    <div className='w-full h-screen flex flex-col p-8 !overflow-x-visible'>
      <h1 className='uppercase text-[4.5rem] leading-none font-sans font-light text-black text-center'>Product Details</h1>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full !overflow-x-visible">
        <div className="flex flex-col items-center">
            {product.image && (
              <Image src={product.image?.url ?? ''} className="h-auto w-full object-contain" alt="t-shirt" priority width={500} height={500} />
            )}
            <h5 className='mt-5 relative p-1 overflow-hidden text-[1.75rem] text-center font-sans font-medium text-black leading-none'>
                $19.90
                <span className='w-full scale-125 block h-[0.0625rem] bg-violet-100 rotate-[-10deg] absolute top-1/2 -translate-y-1/2'></span>
            </h5>
            <h5 className='text-[3.125rem] text-center font-sans font-medium text-black leading-none mt-2'>{product.price?.formatted_with_symbol}</h5>
            <Link className="mt-16 text-center text-white uppercase leading-none rounded-[0.25rem] bg-violet-100 text-[3.625rem] font-light font-sans py-4 px-6 min-w-[15.875rem]"
                  onClick={handleAddToCart} href={`/step-5/${product.id}`}>
                  Buy
            </Link>
            <Link href={`/step-3`} className="inline-flex items-center mt-16 leading-none text-[1.875rem] font-light font-sans">
                <img
                className="h-10 mr-3 rotate-90 w-auto object-contain"
                src="/images/double-arrows-down.svg"
                alt="search"
                />
                <span>Back to catalogue</span>
            </Link>
        </div>
        <div className="flex flex-col !overflow-x-visible">
            <h3 className='text-[2.25rem] leading-none font-sans font-bold text-black'>{product.name}</h3>
            <p className='text-[1.8125rem] leading-none font-sans font-light text-black mt-4' dangerouslySetInnerHTML={{ __html: product.description }}></p>
            <img
            className="h-auto w-12 object-contain my-4"
            src="/images/double-arrows-down.svg"
            alt="search"
            /> 
            <p className='text-[2.0625rem] leading-none font-sans font-medium text-black mb-2'>Select size</p>
            <div className="flex flex-wrap">
                <p className='uppercase text-[3.125rem] leading-none font-sans font-light text-black mt-2 mr-7'>Xs</p>
                <p className='uppercase text-[3.125rem] leading-none font-sans font-light text-black mt-2 mr-7'>s</p>
                <p className='uppercase text-[3.125rem] leading-none font-sans font-light text-black mt-2 mr-7'>m</p>
                <p className='uppercase text-[3.125rem] leading-none font-sans font-light text-black mt-2 mr-7'>l</p>
                <p className='uppercase text-[3.125rem] leading-none font-sans font-light text-black mt-2 mr-7'>Xl</p>
                <p className='uppercase text-[3.125rem] leading-none font-sans font-light text-black mt-2 mr-6'>Xxl</p>
            </div>
            <p className='text-[2.0625rem] leading-none font-sans font-medium text-black mt-8'>Select color</p>
            <div className="flex overflow-x-scroll w-full mt-4">
                <div className='flex-shrink-0 mr-6 !h-[5.5rem] !w-[5.5rem] bg-slate-200'></div>
                <div className='flex-shrink-0 mr-6 !h-[5.5rem] !w-[5.5rem] bg-slate-200'></div>
                <div className='flex-shrink-0 mr-6 !h-[5.5rem] !w-[5.5rem] bg-slate-200'></div>
                <div className='flex-shrink-0 mr-6 !h-[5.5rem] !w-[5.5rem] bg-slate-200'></div>
                <div className='flex-shrink-0 mr-6 !h-[5.5rem] !w-[5.5rem] bg-slate-200'></div>
            </div>
            <p className='text-[2.0625rem] leading-none font-sans font-medium text-black mt-8 mb-4'>Quantity</p>
            <CounterComponent/>
        </div>
      </div>
    </div>
  )
}
