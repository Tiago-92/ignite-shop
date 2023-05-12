import { ReactNode, createContext, useState } from 'react'

export interface ProductType {
  id: string
  name: string
  imageUrl: string
  price: string
  numberPrice: number
  description: string
  defaultPriceId: string
}

interface AppContextType {
  cartItems: ProductType[]
  addToCart: (product: ProductType) => void
  removeToCart: (product: ProductType) => void
}

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContext = createContext({} as AppContextType )

export function AppContextProvider({ children }: AppContextProviderProps ) {
  const [cartItems, setCartItems] = useState<ProductType[]>([])

  function addToCart(product: ProductType) {
    const checkIfProductExists = cartItems.findIndex(
      (cartItem) => cartItem.id === product.id
    )

    if (checkIfProductExists < 0) {
      setCartItems((state) => [...state, product])
    }
  }

  function removeToCart(product: ProductType) {   
    const cartWithoutDeletedItem = cartItems.filter(cartItem => {
      return cartItem.id !== product.id
    })

    setCartItems(cartWithoutDeletedItem)
  }
 
  return (
    <AppContext.Provider value={
      {
        cartItems, 
        addToCart, 
        removeToCart 
      }
    }
    >
      {children}
    </AppContext.Provider>
  )
}