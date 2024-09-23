'use client'

import React, { useCallback, useEffect, useState } from 'react'
import ProductDetail from "../../components/ProductDetail";
// import useCommerce from '@/contexts/useCommerce';
import { Product } from '@chec/commerce.js/types/product';
import useSwell from "@/contexts/useSwell"

export default function page({ params }: { params: { id: string } }) {
  const { getProduct } = useSwell()

  const [product, setProduct] = useState<Product>()

  const getData = useCallback(async () => {
    const product = await getProduct(params.id)
    setProduct(product)
  }, [params.id])

  /* Con lo use uffect non possiamo usare una funziona asincrona perchè va in errore, quindi creiamo getData 
  fuori.
  */
  useEffect(() => {
    getData()
  }, [])

  if (!product) return <></>

  return (
    <ProductDetail product={product} />
  )
}