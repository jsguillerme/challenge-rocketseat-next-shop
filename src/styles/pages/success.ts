import { styled } from '..'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: '100vh',

  div: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    zIndex: 0,

    '&:nth-child(3n)': {
      position: 'absolute',
      marginLeft: '-1rem',
      zIndex: 1,
    },
  },

  h1: {
    fontSize: '$xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    marginTop: '5rem',
    display: 'block',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const ImageContainer = styled('div', {
  width: 130,
  maxWidth: 130,
  height: 130,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '9999px',
  padding: '0.25rem',
  marginTop: '4rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  boxShadow: '1px 1px black',

  img: {
    objectFit: 'cover',
  },
})
