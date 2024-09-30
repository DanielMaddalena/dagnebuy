'use client'

import React, { useCallback, useEffect, useState } from 'react'
import ProductDetail from "../../components/ProductDetail";
import useSwell from "@/contexts/useSwell"
import ProductReleated from '@/app/components/ProductRelated';

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
    <ProductReleated product={product} />
  )
}