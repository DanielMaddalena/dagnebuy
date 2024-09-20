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

  return {
    getProduct,
    getProducts,
    // Aggiungi altre funzioni qui se necessario
  }
}

export default useSwell;