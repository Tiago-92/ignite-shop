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

import tShirt from '../assets/camisetas/5.png'

interface ModalProps {
  openModal: boolean
  closeModal: () => void
}

export default function Cart({ openModal, closeModal } : ModalProps) {
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

        <ProductContainer>
          <ImageContainer>
            <Image src={tShirt} alt="" width={100} height={100} />
          </ImageContainer>
          
          <ProductDetails>
            <p>Camiseta Beyond the Limits</p>
            <span>R$ 79,90</span>
            <button>Remover</button>
          </ProductDetails>
        </ProductContainer>

        <ProductContainer>
          <ImageContainer>
            <Image src={tShirt} alt="" width={100} height={100} />
          </ImageContainer>
          
          <ProductDetails>
            <p>Camiseta Beyond the Limits</p>
            <span>R$ 79,90</span>
            <button>Remover</button>
          </ProductDetails>
        </ProductContainer>

        <ProductContainer>
          <ImageContainer>
            <Image src={tShirt} alt="" width={100} height={100} />
          </ImageContainer>
          
          <ProductDetails>
            <p>Camiseta Beyond the Limits</p>
            <span>R$ 79,90</span>
            <button>Remover</button>
          </ProductDetails>
        </ProductContainer>
      </ListContainer>

      <FinalizePurchaseContainer>
        <QuantityContainer>
          <span>Quantidade</span>
          <span>3 itens</span>
        </QuantityContainer>

        <TotalContainer>
          <span>Valor total</span>
          <span>R$ 270,00</span>
        </TotalContainer>

        <button>Finalizar compra</button>
      </FinalizePurchaseContainer>
    </CartContainer>
  )
}