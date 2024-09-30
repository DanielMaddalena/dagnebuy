'use client'
import React, { useState, useEffect, useCallback } from 'react'
import useSwell from '@/contexts/useSwell'
import Image from 'next/image';
import Link from 'next/link'
import { Product } from 'swell-js';

export default function ProductReleated({ product }: { product: Product }) {
  const { getProduct } = useSwell(); // Funzione per ottenere un prodotto da Swell
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]); // Stato per i prodotti correlati

  // Funzione per ottenere i prodotti correlati
  const fetchRelatedProducts = useCallback(async () => {
    // Otteniamo gli ID dei prodotti correlati da product.up_sells
    const upSellProductIds = product.up_sells?.map(upSell => upSell.product_id) || [];

    // Recuperiamo i dettagli di ciascun prodotto correlato usando gli ID
    const relatedProductsData = await Promise.all(
      upSellProductIds.map(async (id) => await getProduct(id))
    );

    // Impostiamo lo stato con i prodotti correlati
    setRelatedProducts(relatedProductsData);
  }, [product.up_sells, getProduct]);

  // Effettua la chiamata per ottenere i prodotti correlati quando il componente è montato
  useEffect(() => {
    if (product.up_sells) {
      fetchRelatedProducts();
    }
  }, [product.up_sells, fetchRelatedProducts]);

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

      {/* Cicliamo sui prodotti correlati */}
      <div className="mt-14 grid grid-cols-3 gap-x-[3.5rem] gap-y-10 w-full">
        {relatedProducts.map(relatedProduct => (
          <div key={relatedProduct.id} className="flex flex-col items-center space-y-3">
            <img
              className="h-[10rem] w-auto object-contain"
              src={relatedProduct.images?.[0]?.file?.url || '/images/default-product.jpg'} // Mostra l'immagine del prodotto correlato
              alt={relatedProduct.name}
            /> 
            <h3 className='text-[1.75rem] text-center font-sans font-light text-black leading-none'>{relatedProduct.name}</h3>
            <h5 className='text-[1.75rem] text-center font-sans font-medium text-black leading-none mt-2'>{relatedProduct.price?.formatted_with_code || ''}</h5>
            <Link href={`/step-4/${relatedProduct.id}`} key={relatedProduct.id} className="-mt-1 mx-auto text-white uppercase leading-none rounded-[0.25rem] bg-gray-400 text-[1.5rem] font-light font-sans py-1 px-2 w-full">Details</Link>
          </div>
        ))}
      </div>

      <Link className="mx-auto mt-[11.25rem] text-center text-white uppercase leading-none rounded-[0.25rem] bg-violet-100 text-[3.625rem] font-light font-sans py-4 px-6" href={`/step-6`}>Skip and proceed</Link>
    </div>
  );
}
