import { globalStyles } from '@/styles/global'
import { AppProps } from 'next/app'

import { Container } from '../styles/pages/app'

import Cart from '@/components/Cart'
import { useContext, useState } from 'react'

import { AppContext, AppContextProvider } from '@/contexts/AppContext'

import Header from '@/components/Header'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const { totalQuantity } = useContext(AppContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  console.log(totalQuantity)


  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <AppContextProvider>
      <div>
        <Header open={handleOpenModal} />
        <Cart 
          openModal={isModalOpen}
          closeModal={handleCloseModal}
        />

        <Component {...pageProps} />
      </div>
    </AppContextProvider>
  )
}
