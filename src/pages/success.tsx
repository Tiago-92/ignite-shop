import { stripe } from '@/lib/stripe'
import { SuccessContainer, ImageContainer, ImagesRowContainer } from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Stripe from 'stripe'
import Image from 'next/image'
import Head from 'next/head'

interface SuccessProps {
  custumerName: string
  productsImages: string[]
}

export default function Success({ custumerName, productsImages }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesRowContainer>
          {productsImages.map((image, i) => (
            <ImageContainer key={i}>
              <Image src={image} alt="" width={100} height={100} />
            </ImageContainer>
          ))}
        </ImagesRowContainer>
        
        <h1>Compra efetuada!</h1>
        <p>
          Uhuul <strong>{custumerName}</strong>, sua compra de {productsImages.length} camisetas já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}  

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }  
  
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name;
  const productsImages = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product
    return product.images[0]
  })

  return {
    props: {
      customerName,
      productsImages,
    }
  }
}