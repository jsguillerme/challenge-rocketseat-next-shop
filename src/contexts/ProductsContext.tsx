import { ReactNode, createContext, useState } from 'react'

interface ProductsProviderProps {
  children: ReactNode
}

export interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

interface ProductsContextType {
  products: ProductProps[]
  addProductInBag: (data: ProductProps) => void
  removeProductInBag: (id: string) => void
}

export const ProductsContext = createContext({} as ProductsContextType)

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<ProductProps[]>([])

  function addProductInBag(data: ProductProps) {
    setProducts((state) => [...state, data])
  }

  function removeProductInBag(id: string) {
    setProducts((state) => state.filter((product) => product.product.id !== id))
  }

  return (
    <ProductsContext.Provider
      value={{ products, addProductInBag, removeProductInBag }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
