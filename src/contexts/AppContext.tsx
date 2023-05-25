import { ReactNode, createContext, useEffect, useState } from 'react'

export interface ProductType {
  id: string
  name: string
  imageUrl: string
  price: string
  numberPrice: number
  description: string
  defaultPriceId: string
  quantity: number
}

interface AppContextType {
  cartItems: ProductType[]
  totalQuantity: number
  addToCart: (product: ProductType) => void
  removeToCart: (product: ProductType) => void
}

interface AppContextProviderProps {
  children: ReactNode
}

const PRODUCT_STORAGE_KEY = 'igniteShop:produtcs'

export const AppContext = createContext({} as AppContextType )

export function AppContextProvider({ children }: AppContextProviderProps ) {
  const [cartItems, setCartItems] = useState<ProductType[]>(() => {
    if (typeof window !== 'undefined') {
      const saveToLocalStorage = localStorage.getItem(PRODUCT_STORAGE_KEY)
      
      if (saveToLocalStorage) {
        return JSON.parse(saveToLocalStorage)}
    }
    return []
  })

  const totalQuantity = cartItems.length

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

  useEffect(() => {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])
 
  return (
    <AppContext.Provider
      value={
        {
          cartItems, 
          addToCart, 
          removeToCart,
          totalQuantity
        }
      }
    >
      {children}
    </AppContext.Provider>
  )
}