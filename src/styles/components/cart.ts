import { styled } from '..'

export const CartContainer = styled('div', {
  position: 'absolute',
  width: '30rem',
  height: '56.25rem',

  top: '0',
  bottom: '0',
  right: '0',

  background: '$gray800',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

  zIndex: 1

})

export const CloseButtton = styled('button', {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',

  right: 0,
  position: 'absolute',

  marginTop: '1.75rem',
  marginRight: '1.75rem'

})


export const ListContainer = styled('div', {
  marginTop: '4.5rem',
  marginLeft: '3rem',

  h1: {
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: '2rem',
    textAlign: 'left'
  }
})

export const ProductContainer = styled('div', {
  marginTop: '2rem',

  display: 'flex',
  gap: '1.25rem',
})

export const ImageContainer = styled('div', {
  width: '5.94rem',
  height: '5.94rem',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  
  p: {
    fontSize: '1.12rem',
    fontWeight: 400,
    lineHeight: '1.81rem',
    textAlign: 'left',
    color: '$gray300'
  },
  
  span: {
    fontSize: '$md',
    fontWeight: 700,
    lineHeight: '1.81rem',
    textAlign: 'left',
    color: '$gray100',
  },

  button: {
    border: 'none',
    background: 'transparent',

    cursor: 'pointer',

    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: '1.63rem',
    color: '$green500',

    '&:hover': {
      color: '$green300',
    }
  }    
})

export const FinalizePurchaseContainer = styled('div', {
  bottom: 0,
  position: 'absolute',

  marginLeft: '3rem',
  marginRight: '3rem',

  width: '24rem',

  button: {
    background: '$green500',
    border: 'none',
    borderRadius: 8,
  
    marginTop: '3.56rem',

    width: '24rem',
    height: '4.31rem',

    fontSize: '$md',
    fontWeight: 700,
    color: '$white',
    lineHeight: '1.81rem',

    cursor: 'pointer',

    '&:hover': {
      background: '$green300', 
    }
  }
})

export const QuantityContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  span: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.63rem',
    color: '$gray100',
  }
})

export const TotalContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  span: {
    fontSize: '$md',
    fontWeight: 700,
    lineHeight: '1.81rem',
    color: '$gray100',
  }
})