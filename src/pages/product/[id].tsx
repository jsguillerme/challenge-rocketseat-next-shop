import { GetStaticPaths, GetStaticProps } from 'next'
import { ProductProps, ProductsContext } from '@/contexts/ProductsContext'
import { stripe } from '@/lib/stripe'
import { useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { HeaderContent } from '@/components/Header'

export default function Product({ product }: ProductProps) {
  const { addProductInBag, products } = useContext(ProductsContext)

  async function handleAddProductInBag(data: ProductProps) {
    addProductInBag(data)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <HeaderContent quantityProducts={String(products.length)} />
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={() => handleAddProductInBag({ product })}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}
/*
  getStaticProps serve basicamente para podermos inserir propriedades que serão dinamicas, no caso de uso abaixo:
  estamos retornando os paths que estarão carregados previamente antes mesmo de ir para a camada de server do site

  a função fallback, quando passamos o valor false, quer dizer que qualquer dado diferente do path que passarmos, 
  não será tratado de forma semelhante, consequentemente, um 404 pornão encontrar.

  se colocarmos true, qualquer outro id que passarmos, ele tratará como semelhante do path que passamos e enviará 
  para o getStaticProps.
*/
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_O9GU6hbqtOZhqY' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
