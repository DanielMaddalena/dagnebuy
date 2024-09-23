'use client'
import React, { useState, useCallback, useEffect } from 'react'
import CounterComponent from './CounterComponent'
import { Product } from '@chec/commerce.js/types/product'
// import { useCart } from '@/contexts/useCart'
import useCommerce from '@/contexts/useCommerce'
import useSwell from '@/contexts/useSwell'
import Image from 'next/image';
import Link from 'next/link'

/* devo specificare che product è del tipo Product perchè siamo passati da un componente all'altro,
in questo modo typescript capisce
*/

export default function ProductDetail({ product }: { product: Product }) {
  const { addVariant, getCart } = useSwell();
   
  const [selectedOptions, setSelectedOptions] = useState({});

  // Funzione per gestire il click sul bottone dell'opzione
  const handleOptionClick = (optionName, valueName) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [optionName]: valueName,
    }));
  };

  const handleViewCart = async () => {
    try {
      const cart = await getCart();
      console.log('Carrello:', cart);
    } catch (error) {
      console.error('Errore nel recupero del carrello:', error);
    }
  };
  const handleAddVariant = async () => {
    try {
      const updatedCart = await addVariant('5c15505200c7d14d851e510f', 1, '5c15512e55f3l04q047b480g');
      console.log('Carrello aggiornato:', updatedCart);
    } catch (error) {
      console.error('Errore nell\'aggiunta della variante al carrello:', error);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col p-8 !overflow-x-visible'>
      <h1 className='uppercase text-[4.5rem] leading-none font-sans font-light text-black text-center'>Product Details</h1>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full !overflow-x-visible">
        <div className="flex flex-col items-center">
            {product.images && product.images.length > 0 && (
              <Image src={product.images[0]?.file?.url ?? ''} className="mb-10 h-auto w-full object-contain" alt="t-shirt" priority width={500} height={500} />
            )}
            { product.orig_price && (<h5 className='relative p-1 overflow-hidden text-[1.75rem] text-center font-sans font-medium text-black leading-none'>
                  {product.orig_price}
                  <span className='w-full scale-125 block h-[0.0625rem] bg-violet-100 rotate-[-10deg] absolute top-1/2 -translate-y-1/2'></span>
              </h5>
            )}
            <h5 className='text-[3.125rem] text-center font-sans font-medium text-black leading-none mt-2'>{product.price}</h5>
            <Link className="mt-16 text-center text-white uppercase leading-none rounded-[0.25rem] bg-violet-100 text-[3.625rem] font-light font-sans py-4 px-6 min-w-[15.875rem]"
                  onClick={handleAddVariant} href={`/step-5/${product.id}`}>
                  Buy
            </Link>
            <Link href={`/step-3`} className="inline-flex items-center mt-16 leading-none text-[1.875rem] font-light font-sans">
                <img
                className="h-10 mr-3 rotate-90 w-auto object-contain"
                src="/images/double-arrows-down.svg"
                alt="search"
                />
                <span onClick={handleViewCart}>Back to catalogue</span>
            </Link>
        </div>
        <div className="flex flex-col !overflow-x-visible">
          {console.log(product)}
            <h3 className='text-[2.25rem] leading-none font-sans font-bold text-black'>{product.name}</h3>
            <p className='text-[1.8125rem] leading-none font-sans font-light text-black mt-4 mb-10' dangerouslySetInnerHTML={{ __html: product.description }}></p>
            {/* Itera su tutte le varianti */}
            {product.options && product.options.map((option, index) => (
              <div key={index} className="mt-4">
                <p className='text-[2.0625rem] leading-none font-sans font-medium text-black mb-3 mt-6'>
                  {option.name}
                </p>
                <div className="flex flex-wrap">
                  {option.values.map((value, idx) => (
                    <button
                      key={idx}
                      className={`first-letter:uppercase text-[1.75rem] leading-none font-sans font-light mt-2 mr-7 ${selectedOptions[option.name] === value.name ? 'text-violet-100 font-bold' : ''}`}
                      onClick={() => handleOptionClick(option.name, value.name)}
                    >
                      {value.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <p className='text-[2.0625rem] leading-none font-sans font-medium text-black mt-8 mb-4'>Quantity</p>
            <CounterComponent/>
        </div>
      </div>
    </div>
  )
}
