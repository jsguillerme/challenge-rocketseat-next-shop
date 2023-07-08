import { GetStaticProps } from 'next'
import Head from 'next/head'
import { BagShopping, HomeContainer, Product } from '@/styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'
import Image from 'next/image'
import Stripe from 'stripe'

import 'keen-slider/keen-slider.min.css'
import { ShoppingBag } from 'lucide-react'
import { HeaderContent } from '@/components/Header'
import { useContext } from 'react'
import { ProductsContext } from '@/contexts/ProductsContext'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home(props: HomeProps) {
  const { products } = useContext(ProductsContext)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HeaderContent quantityProducts={String(products.length)} />

      <HomeContainer ref={sliderRef} className="keen-slider">
        {props.products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false} // o next por padrão quando tem links na pagina,ele tenta recarregar previamente o resultado dos links, o prefetch false é para evitar dele tentar fazer esse pré-carregamento
            >
              <Product className="keen-slider__slide">
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt={product.name}
                />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <BagShopping>
                    <ShoppingBag />
                  </BagShopping>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 10,
  }
}
