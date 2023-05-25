import { useContext, useState } from "react"

import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

import { 
  ImageContainer,
  ProductContainer, 
  ProductDetails 
} from "@/styles/pages/products"

import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Head from "next/head"
import { AppContext, ProductType } from "@/contexts/AppContext"

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { addToCart } = useContext(AppContext)

  function handleAddToCart(product: ProductType) {
    addToCart(product)
  }
  
  return (
    <>
    <Head>
      <title>{product.name} | Ignite Shop</title>
    </Head>

    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button onClick={() => handleAddToCart(product)}>
          Colocar na sacola
        </button>
      </ProductDetails>
    </ProductContainer>
  </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NhVsFXDfbHet6s'} }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount as number / 100),
      description: product.description,
      defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}