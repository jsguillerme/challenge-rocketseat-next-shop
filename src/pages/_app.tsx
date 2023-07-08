import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import { Container } from '@/styles/pages/app'
import { ProductsProvider } from '@/contexts/ProductsContext'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <ProductsProvider>
        <Component {...pageProps} />
      </ProductsProvider>
    </Container>
  )
}
