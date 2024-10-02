'use client'

import React, { useCallback, useEffect, useState } from 'react';
import useSwell from '@/contexts/useSwell';

export default function Page() {
  const { getCart, removeProduct } = useSwell();
  const [cart, setCart] = useState(null);
  const [loadingItems, setLoadingItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        console.log('Dati del carrello:', cartData);
        setCart(cartData);
      } catch (error) {
        console.error('Errore nel recupero del carrello:', error);
      }
    };

    fetchCart();
  }, [getCart]);

  // Funzione per gestire la rimozione dell'articolo
  const handleRemoveItem = useCallback(
    async (itemId) => {
      setLoadingItems((prev) => [...prev, itemId]);
      try {
        await removeProduct(itemId);
        const updatedCart = await getCart();
        setCart(updatedCart);
      } catch (error) {
        console.error("Errore nel rimuovere l'articolo:", error);
      } finally {
        setLoadingItems((prev) => prev.filter((id) => id !== itemId));
      }
    },
    [removeProduct, getCart]
  );

  if (!cart) {
    return <div className='w-full h-screen flex justify-center items-center'>Caricamento...</div>;
  }

  return (
    <div className='w-full h-screen flex flex-col p-8 px-11'>
      <h1 className='uppercase text-[4.375rem] leading-none font-sans font-light text-black text-center'>Revisione finale</h1>
      <div className="divide-black divide-y-2 mt-16">
      {cart.items.map((item) => (
      <div key={item.id} className="flex items-start justify-between py-4">
        <div className="flex flex-col">
          <h3 className="font-sans font-light uppercase text-[2.0625rem] leading-none max-w-[19rem]">
            {item.product.name}
          </h3>
          <p className="font-sans font-light uppercase text-[1.25rem] leading-none max-w-[19rem]">
            {item.variant ? item.variant.name : ''}
          </p>
          <div className="inline-flex">
            <h5 className="text-[1.75rem] font-sans font-medium text-black leading-none mt-2">
              €{item.price_total.toFixed(2)}
            </h5>
            <CounterComponent stockLevel={stockLevel} quantity={quantity} setQuantity={setQuantity} />
          </div>
          
        </div>
        {loadingItems.includes(item.id) ? (
          <div className="ml-auto flex items-center">
            <img
              className="h-12 w-auto object-contain"
              src="/images/loading.svg"
              alt="Caricamento"
            />
          </div>
        ) : (
          <button className="ml-auto" onClick={() => handleRemoveItem(item.id)}>
            <img
              className="h-12 w-auto object-contain"
              src="/images/delete.svg"
              alt="Elimina"
            />
          </button>
        )}
      </div>
    ))}
      </div>
      <img
        className="h-20 mt-5 w-auto object-contain"
        src="/images/double-arrows-down.svg"
        alt="Scorri"
      />
      <p className='mt-8 uppercase text-[2.06125rem] leading-none font-sans font-medium text-black text-center'>
        Totale da pagare per {cart.item_quantity} articoli: €{cart.sub_total.toFixed(2)}
      </p>
      <button className="mx-auto mt-12 text-white uppercase leading-none rounded-[0.25rem] bg-violet-100 text-[3.625rem] font-light font-sans py-4 px-6">
        Conferma
      </button>
    </div>
  );
}
