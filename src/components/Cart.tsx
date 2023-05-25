import { 
  CartContainer,  
  ListContainer, 
  ProductContainer,
  ProductDetails,
  FinalizePurchaseContainer,
  CloseButtton,
  ImageContainer,
  QuantityContainer,
  TotalContainer,
} 
from '@/styles/components/cart'
import Image from 'next/image'
import closeIcon from '../assets/close-icon.svg'
import { useContext, useState } from 'react'
import { AppContext, ProductType } from '@/contexts/AppContext'
import axios from 'axios'

interface ModalProps {
  openModal: boolean
  closeModal: () => void
}

export default function Cart({ openModal, closeModal } : ModalProps) {
  const { cartItems, removeToCart } = useContext(AppContext)
  const [isCreatingCheckoutSessions, setIsCreatingCheckoutSessions] = useState(false)

  const totalItems = cartItems.length
  
  const sumValues = cartItems.reduce((acc, item) =>
    acc + parseFloat(item.price.replace(/[^\d.,]/g, '').replace(',', '.')), 0)
  
    const totalValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(sumValues)

  async function handleBuyProducts() {
    try {
      setIsCreatingCheckoutSessions(true)

      const response = await axios.post(`/api/checkout`, {
        products: cartItems
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

    } catch (err) {
      // Conectar com uma ferramenta de observalidade (Datalog, Sentry)

      setIsCreatingCheckoutSessions(false)

      alert("Falha ao redirecionar ao checkout")
    }
  }

  function handleRemoveItemToCart(product: ProductType) {
    removeToCart(product)
  }

  if (!openModal) {
    return null
  }
  
  return (
      <CartContainer>
        <CloseButtton onClick={closeModal}>
          <Image src={closeIcon} alt="" />
        </CloseButtton>      
        <ListContainer>
          <h1>Sacola de compras</h1>
  
          {cartItems.map((product) => (
            <ProductContainer key={product.id}>
              <ImageContainer>
                <Image src={product.imageUrl} alt="" width={100} height={100} />
              </ImageContainer>
              
              <ProductDetails>
                <p>{product.name}</p>
                <span>{product.price}</span>
                <button onClick={() => handleRemoveItemToCart(product)}>Remover</button>
              </ProductDetails>
          </ProductContainer>
          ))}        
        </ListContainer>
  
        <FinalizePurchaseContainer>
          <QuantityContainer>
            <span>Quantidade</span>
            <span>{totalItems}</span>
          </QuantityContainer>
  
          <TotalContainer>
            <span>Valor total</span>
            <span>{totalValue}</span>
          </TotalContainer>
  
          <button onClick={handleBuyProducts}>Finalizar compra</button>
        </FinalizePurchaseContainer>
      </CartContainer> 
  )
}