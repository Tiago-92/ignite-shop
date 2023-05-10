import { ReactNode, createContext, useState } from 'react'

interface AppContextProviderProps {
  children: ReactNode
}

interface AppContextType {

}

export const AppContext = createContext({} as AppContextType )

export function AppContextProvider({ children }: AppContextProviderProps ) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  function OpenModal() {
    setIsModalOpen(true)
  }

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        OpenModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}