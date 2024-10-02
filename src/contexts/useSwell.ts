import React, { useCallback } from 'react'
import swell from '@/lib/client' // Assicurati che questo percorso sia corretto

const useSwell = () => {
  // Funzione per ottenere un singolo prodotto in base all'ID
  const getProduct = useCallback(async (id: string) => {
    try {
      const product = await swell.products.get(id);
      return product;
    } catch (error) {
      console.error('Errore nel recupero del prodotto:', error);
      throw error;
    }
  }, []);

  // Funzione per ottenere la lista dei prodotti
  const getProducts = useCallback(async () => {
    try {
      // Recupera i prodotti usando Swell
      const data = await swell.products.list({
        limit: 25, // Puoi modificare il numero di prodotti da recuperare
        page: 1,
      });

      // Restituisce l'array dei prodotti recuperati
      return data.results; 
    } catch (error) {
      console.error('Errore nel recupero dei prodotti:', error);
      throw error; // Rilancia l'errore per una migliore gestione in fase di chiamata
    }
  }, []);

  // Funzione per ottenere il carrello corrente
  const getCart = useCallback(async () => {
    try {
      const cart = await swell.cart.get();
      return cart;
    } catch (error) {
      console.error('Errore nel recupero del carrello:', error);
      throw error;
    }
  }, []);

  // Funzione per aggiungere un articolo al carrello con una variante
  const addVariant = useCallback(async (productId: string, quantity: number, variantId: string) => {
    try {
      const cart = await swell.cart.addItem({
        product_id: productId,
        quantity: quantity,
        variant_id: variantId
      });
      return cart;
    } catch (error) {
      console.error('Errore nell\'aggiunta del prodotto al carrello:', error);
      throw error;
    }
  }, []);

  //funzione rimuovere un articolo in base all'id dal carrello
  const removeProduct = useCallback(async (itemId: string) => {
    try {
      const cart = await swell.cart.removeItem(itemId);
      return cart;
    } catch (error) {
      console.error('Errore nel rimuovere il prodotto:', error);
      throw error;
    }
  }, []);

  // const removeProduct = useCallback(async (item_id: string) => {
  //   return swell.cart.removeItem(item_id)
  // }, [])

  const setCurrent = useCallback(async () => {
    return swell.currency.set('EUR');
  }, []);
  

  return {
    removeProduct,
    setCurrent,
    getProduct,
    getProducts,
    getCart, // Aggiunta della funzione getCart
    addVariant, // Aggiunta della funzione addVariant
    // Aggiungi altre funzioni qui se necessario
  }
}

export default useSwell;
