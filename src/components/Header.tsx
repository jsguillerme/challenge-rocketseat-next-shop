import logoImg from '@/assets/Logo.svg'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { Header, BagShopping } from '@/styles/pages/app'
import * as Dialog from '@radix-ui/react-dialog'
import { CheckoutBagModal } from './CheckoutBag'

interface HeaderProps {
  quantityProducts: string
}

export function HeaderContent({ quantityProducts }: HeaderProps) {
  return (
    <Header>
      <Image src={logoImg} alt="" />

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <BagShopping
            css={{
              '&::after': { content: `${quantityProducts}` },
            }}
          >
            <ShoppingBag />
          </BagShopping>
        </Dialog.Trigger>

        <CheckoutBagModal />
      </Dialog.Root>
    </Header>
  )
}
