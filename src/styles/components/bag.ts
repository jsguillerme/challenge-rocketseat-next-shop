import * as Dialog from '@radix-ui/react-dialog'
import { styled } from '..'

export const ListProducts = styled('section', {
  maxHeight: '500px',
  height: '500px',
  width: '100%',
  overflowY: 'scroll',
  scrollBehavior: 'smooth',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '$gray300',
    borderRadius: '6px',
  },
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'self-start',
  gap: '24px',

  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    p: {
      color: '#c4c4cc90',
      fontSize: '1.125rem',
    },
  },
})

export const BagProducts = styled('div', {
  minWidth: '24rem',
  height: '6rem',
  background: 'transparent',
  border: 0,

  display: 'flex',
  alignItems: 'center',
  gap: '20px',

  '& > div': {
    width: '5.875rem',
    height: '5.875rem',
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > img': {
      width: '90%',
      heigth: '90%',
      objectFit: 'cover',
    },
  },

  '& > section': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'self-start',
    gap: '0.5rem',

    span: {
      color: '#c4c4cc',
      fontSize: '1.125rem',
    },

    p: {
      fontWeight: 'bold',
    },

    button: {
      border: 0,
      background: 'transparent',
      color: 'green',
      width: 'max-content',

      cursor: 'pointer',

      '&:hover': {
        opacity: 0.8,
        transition: 'opacity 0.3s',
      },

      fontSize: '1rem',
    },
  },
})

export const BagPrices = styled('div', {
  width: '100%',
  maxHeight: '300px',

  display: 'flex',
  flexDirection: 'column',
  gap: '40px',

  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',

    alignItems: 'flex-start',
    justifyContent: 'flex-end',

    '& > div': {
      width: '100%',

      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',

      '&:first-child': {
        color: '$gray300',
      },

      '&:last-child': {
        fontSize: '1.2rem',
        fontWeight: 'bold',
      },
    },
  },

  button: {
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
      transition: 'background 0.4s',
    },

    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
})

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  background: 'rgba(0,0,0,0.55)',
})

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  background: 'transparent',
  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: '0',

  cursor: 'pointer',
  color: '$gray300',

  '&:hover': {
    color: '$gray100',
    transition: 'color 0.3s',
  },
})

export const Content = styled(Dialog.Content, {
  minWidth: '30rem',
  height: '100%',
  borderRadius: 2,
  padding: '4rem 3rem',
  background: '$gray800',

  position: 'fixed',
  top: 0,
  right: 0,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '2rem',
})
