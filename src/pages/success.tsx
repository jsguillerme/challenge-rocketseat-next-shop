import { stripe } from '@/lib/stripe'
import { ImageContainer, SuccessContainer } from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import logoImg from '@/assets/Logo.svg'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

interface SuccessProps {
  customerName: string
  itemsProducts: [
    {
      id: string
      price: Stripe.Price | any
    },
  ]
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({
  customerName,
  product,
  itemsProducts,
}: SuccessProps) {
  console.log(itemsProducts)
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <Image src={logoImg} alt="" width={120} height={110} />

        <div>
          {itemsProducts.length > 0
            ? itemsProducts.map((item) => {
                return (
                  <ImageContainer key={item.id}>
                    <Image
                      src={item.price.product.images[0]}
                      width={120}
                      height={110}
                      alt=""
                    />
                  </ImageContainer>
                )
              })
            : ''}
        </div>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuull <strong>{customerName}</strong>, sua compra de{' '}
          {itemsProducts.length === 1
            ? '1 camiseta'
            : itemsProducts.length + ' camisetas'}{' '}
          já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  console.log(session.line_items?.data)

  const customerName = session.customer_details!.name
  const itemsProducts = session.line_items?.data
  const product = session.line_items!.data[0].price?.product as Stripe.Product

  console.log(itemsProducts?.length)

  return {
    props: {
      customerName,
      itemsProducts,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }
}
