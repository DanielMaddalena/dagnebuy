'use client'
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import CounterComponent from './CounterComponent'
import { Product } from '@chec/commerce.js/types/product'
// import { useCart } from '@/contexts/useCart'
import useCommerce from '@/contexts/useCommerce'
import useSwell from '@/contexts/useSwell'
import Image from 'next/image';
import Link from 'next/link'

export default function ProductDetail({ product }: { product: Product }) {
  const { addVariant, getCart } = useSwell();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [variants, setVariants] = useState(product.variants.results || []);
  const [stockLevel, setStockLevel] = useState(null);
  const [isBuyButtonDisabled, setIsBuyButtonDisabled] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const getSelectedVariant = useCallback(() => {
    if (Object.keys(selectedOptions).length !== product.options.length) {
      return null;
    }
  
    const selectedVariant = variants.find(variant => {
      const variantOptions = variant.name.split(', ').reduce((acc, value, index) => {
        const optionName = product.options[index].name;
        acc[optionName] = value;
        return acc;
      }, {});
  
      return Object.keys(selectedOptions).every(optionName =>
        variantOptions[optionName] === selectedOptions[optionName]
      );
    });
  
    return selectedVariant || null;
  }, [selectedOptions, variants, product.options]);

  // Funzione per ottenere il livello di stock della variante selezionata
  const getSelectedVariantStockLevel = useCallback(() => {
    const selectedVariant = getSelectedVariant();
    return selectedVariant ? selectedVariant.stock_level : null;
  }, [getSelectedVariant]);
  

  // Effetto per aggiornare il livello di stock e lo stato del pulsante Buy quando le opzioni selezionate cambiano
  useEffect(() => {
    const stockLevel = getSelectedVariantStockLevel();
    setStockLevel(stockLevel);

    // Verifica se tutte le opzioni sono state selezionate e se c'è un livello di stock disponibile
    const allOptionsSelected = product.options.length === Object.keys(selectedOptions).length;
    setIsBuyButtonDisabled(!(allOptionsSelected && stockLevel > 0));
  }, [selectedOptions, getSelectedVariantStockLevel, product.options]);

  const availableOptions = useMemo(() => {
    const newAvailableOptions = {};

    product.options.forEach(option => {
      const filteredVariants = variants.filter(variant => {
        const variantOptions = variant.name.split(', ').reduce((acc, value, index) => {
          const optionName = product.options[index].name;
          acc[optionName] = value;
          return acc;
        }, {});
        return Object.keys(selectedOptions).every(selectedOptionName => {
          if (selectedOptionName === option.name) return true;
          return variantOptions[selectedOptionName] === selectedOptions[selectedOptionName];
        });
      });

      const availableValues = new Set();
      filteredVariants.forEach(variant => {
        const variantOptions = variant.name.split(', ').reduce((acc, value, index) => {
          const optionName = product.options[index].name;
          acc[optionName] = value;
          return acc;
        }, {});
        availableValues.add(variantOptions[option.name]);
      });
      newAvailableOptions[option.name] = Array.from(availableValues);
    });

    return newAvailableOptions;
  }, [selectedOptions, variants]);

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
      const selectedVariant = getSelectedVariant();
      if (!selectedVariant) {
        console.error('Nessuna variante selezionata');
        return;
      }
  
      // Aggiungi la variante al carrello
      const updatedCart = await addVariant(product.id, quantity, selectedVariant.id);
      console.log('Carrello aggiornato:', updatedCart);
  
      // Ottieni il carrello aggiornato e stampalo in console
      const cart = await getCart();
      console.log('Carrello:', cart);
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
            <button
              className={`mt-16 text-center text-white uppercase leading-none rounded-[0.25rem] bg-violet-100 text-[3.625rem] font-light font-sans py-4 px-6 min-w-[15.875rem] ${isBuyButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={(e) => { 
                e.preventDefault(); 
                if (!isBuyButtonDisabled) {
                  handleAddVariant();
                  window.location.href = `/step-5/${product.id}`;  // Cambia pagina
                }
              }}
              disabled={isBuyButtonDisabled}

            >
              Buy
            </button>

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
                {option.values.map((value, idx) => {
                  const isSelected = selectedOptions[option.name] === value.name;
                  const isAvailable = availableOptions[option.name]?.includes(value.name);
                  return (
                    <button
                      key={idx}
                      className={`first-letter:uppercase text-[1.75rem] leading-none font-sans font-light mt-2 mr-7 hover:text-violet-100 ${isSelected ? 'text-violet-100  font-bold' : ''} ${!isAvailable ? 'text-gray-400' : ''}`}
                      onClick={() => handleOptionClick(option.name, value.name)}
                      disabled={!isAvailable}
                    >
                      {value.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
            <p className='text-[2.0625rem] leading-none font-sans font-medium text-black mt-8 mb-4'>Quantity</p>
            <CounterComponent stockLevel={stockLevel} quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>
    </div>
  )
}
