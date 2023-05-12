import { globalStyles } from '@/styles/global'
import { AppProps } from 'next/app'

import { Container, HeaderContainer } from '../styles/pages/app'

import Cart from '@/components/Cart'
import { useState } from 'react'

import logoImg from '../assets/logo.svg'
import bag from '../assets/bag.svg'
import Image from 'next/image'
import Link from 'next/link'
import { AppContextProvider } from '@/contexts/AppContext'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
 
  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <AppContextProvider>
      <Container>
        <HeaderContainer>
          <Link href="/">
            <Image src={logoImg} alt="" />
          </Link>
        
          <button onClick={handleOpenModal}>
            <Image src={bag} alt="" />
          </button>
        </HeaderContainer>

        <Cart 
          openModal={isModalOpen}
          closeModal={handleCloseModal} 
        />

        <Component {...pageProps} />
      </Container>
    </AppContextProvider>
  )
}
