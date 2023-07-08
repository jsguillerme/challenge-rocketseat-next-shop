import { ProductsContext } from '@/contexts/ProductsContext'
import {
  CloseButton,
  Overlay,
  Content,
  BagProducts,
  ListProducts,
  BagPrices,
} from '@/styles/components/bag'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useContext } from 'react'

import emptyImg from '@/assets/Empty.svg'
import Image from 'next/image'

export function CheckoutBagModal() {
  const { products, removeProductInBag } = useContext(ProductsContext)

  const amountPrices = products.reduce((amount, product) => {
    const priceSanitized = product.product.price.replace('R$', '')
    const priceSanitizedToNumber = Number(priceSanitized.replace(',', '.'))

    return amount + priceSanitizedToNumber
  }, 0)

  function handleRemoveProductInBag(id: string) {
    removeProductInBag(id)
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Sacola de compras</Dialog.Title>
        <CloseButton>
          <X size={32} />
        </CloseButton>

        <ListProducts>
          {products.length === 0 ? (
            <main>
              <Image src={emptyImg} alt="" width={340} height={360} />
              <p>Sua sacola de compras ainda está vazia... :(</p>
            </main>
          ) : (
            products.map((product) => {
              return (
                <BagProducts key={product.product.id}>
                  <div>
                    <img src={product.product.imageUrl} alt="" />
                  </div>
                  <section>
                    <span>{product.product.name}</span>
                    <p>{product.product.price}</p>
                    <button
                      onClick={() =>
                        handleRemoveProductInBag(product.product.id)
                      }
                    >
                      Remover
                    </button>
                  </section>
                </BagProducts>
              )
            })
          )}
        </ListProducts>

        <BagPrices>
          <div>
            <div>
              <span>Quantidade</span>
              <p>
                {products.length === 1 ? '1 item' : products.length + ' itens'}
              </p>
            </div>
            <div>
              <span>Valor total</span>
              <p>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                }).format(amountPrices)}
              </p>
            </div>
          </div>
          <button disabled={!products.length}>Finalizar Compra</button>
        </BagPrices>
      </Content>
    </Dialog.Portal>
  )
}
