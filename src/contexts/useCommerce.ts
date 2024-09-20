import React, { useCallback } from 'react'
import commerce from '@/lib/commerce'

const useCommerce = () => {
  const getProduct = useCallback((id: string) => {
    return commerce.products.retrieve(id)
  }, [commerce])

  const getProducts = useCallback(async () => {
    const response = await commerce.products.list()
    return response?.data
  }, [commerce])
  const addToCart = useCallback(async (productId: string, quantity: number) => {
    try {
      const response = await commerce.cart.add(productId, quantity)
      console.log(response)
      return response.cart // Puoi decidere di ritornare l'intera risposta o solo una parte di essa
    } catch (error) {
      console.error("Errore durante l'aggiunta del prodotto al carrello:", error)
    }
  }, [commerce])
  const removeToCart = useCallback(async (productId: string, quantity: number) => {
    try {
      const response = await commerce.cart.remove(productId)
      console.log(response)
      return response.cart // Puoi decidere di ritornare l'intera risposta o solo una parte di essa
    } catch (error) {
      console.error("Errore durante la rimozione del prodotto al carrello:", error)
    }
  }, [commerce])
   // New function to get the contents of the cart
   const getCartContents = useCallback(async () => {
    try {
      const response = await commerce.cart.contents()
      console.log(response)
      return response // You can decide to return the entire response or just a part of it
    } catch (error) {
      console.error("Error while retrieving cart contents:", error)
    }
  }, [commerce])

  return {
    getProducts,
    getProduct,
    addToCart,
    removeToCart,
    getCartContents
  }
}

export default useCommerce