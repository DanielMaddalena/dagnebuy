'use client'

import { Product } from '@chec/commerce.js/types/product'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import useCommerce from './useCommerce'

export interface ICartContext {
    items: Product[]
    setItems: (products: Product[]) => void
}

export const CartContext = createContext<ICartContext>({} as ICartContext)

export const useCart = () => {
    const context = useContext<ICartContext>(CartContext)

    if (!context) {
        throw new Error('You need to use useCart inside a CartProvider')
    }

    return context
}

/* Un provider mi da la possibilità di avere tutte  la variabile e le funzioni qui dichiarate in tutta l'app, 
quindi tutto cioè che è dentro a <CartProvicer></cartProvider> hanno accesso. 
useCart (scritta sopra) è la funzione che usi per accedere a queste variabile. nella funzione useCart importo il contesto 
e se il contesto non è dentro al provider esce l'errore

*/


export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    //const { getCart } = useCommerce()

    const [items, setItems] = useState<Product[]>([])

    //const [cart, setCart] = useState()

    // Add your functions
    //add
    //remove

    const providerValues = useMemo(() => ({
        items,
        setItems,
    }), [items])

    /*useEffect(() => {
        getCart()
        set()
    }, [])*/

    return (
        <CartContext.Provider value={providerValues}>
            {children}
        </CartContext.Provider>
    )
}