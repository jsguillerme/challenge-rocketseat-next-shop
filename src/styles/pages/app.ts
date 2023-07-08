import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const BagShopping = styled('button', {
  width: '3rem',
  height: '3rem',
  backgroundColor: '$gray800',
  borderRadius: 6,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  border: 0,
  outline: 'none',

  cursor: 'pointer',

  svg: {
    color: '#8D8D99',
  },

  position: 'relative',

  '&::after': {
    width: '1.2rem',
    height: '1.2rem',
    borderRadius: '9999px',
    background: '$green500',
    color: '$white',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    top: '-0.5rem',
    right: '-0.2rem',
  },
})
