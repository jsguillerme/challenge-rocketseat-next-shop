import { ProductProps } from '@/contexts/ProductsContext'
import { stripe } from '@/lib/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { items } = req.body
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!items) {
    return res.status(400).json({ error: 'Price not found or not found items' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const lineItemsProducts: any = []
  const productsBefore: any = []

  items.map((item: ProductProps) => {
    if (!productsBefore.includes(item.defaultPriceId)) {
      productsBefore.push(item.defaultPriceId)

      lineItemsProducts.push({
        price: item.defaultPriceId,
        quantity: 1,
      })

      return {
        price: item.defaultPriceId,
        quantity: 1,
      }
    } else {
      const productIndexToEdit = productsBefore.indexOf(item.defaultPriceId)
      productsBefore.push(item.defaultPriceId)

      return {
        price: lineItemsProducts[productIndexToEdit].price,
        quantity: lineItemsProducts[productIndexToEdit].quantity++,
      }
    }
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: lineItemsProducts,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
