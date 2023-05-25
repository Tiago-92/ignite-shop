import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"

import { useKeenSlider } from 'keen-slider/react'

import greenBag from '../assets/green-bag.svg'

import { stripe } from "@/lib/stripe"
import { HomeContainer, Product } from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"
import { useContext } from "react"
import { AppContext, ProductType } from "@/contexts/AppContext"
import { MouseEvent } from "react"
export interface HomeProps {
  products: ProductType[]
}

export default function Home({ products }: HomeProps) {
  const { addToCart } = useContext(AppContext)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    }
  })

  function handleAddToCart(e: MouseEvent<HTMLButtonElement>, product: ProductType) {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Product href={`/product/${product.id}`} key={product.id} prefetch={false} className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

                <button onClick={(e) => handleAddToCart(e, product)}>
                  <Image src={greenBag} alt="" />
                </button>                
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount as number / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2h
  }
}
