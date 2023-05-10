import { useState } from "react"

import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

import { 
  ImageContainer,
  ProductContainer, 
  ProductDetails 
} from "@/styles/pages/products"

import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import axios from "axios"
import Head from "next/head"

import Cart from "@/components/Cart"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSessions, setIsCreatingCheckoutSessions] = useState(false)
  
  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSessions(true)

      const response = await axios.post(`/api/checkout`, {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

    } catch (err) {
      // Conectar com uma ferramenta de observalidade (Datalog, Sentry)

      setIsCreatingCheckoutSessions(false)

      alert("Falha ao redirecionar ao checkout")
    }
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

        <button onClick={handleBuyProduct}>
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