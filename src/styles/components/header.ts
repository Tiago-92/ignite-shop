import { styled } from "@stitches/react";

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1100,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',

  button: {
    position: 'relative',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',

    span: {
      position: 'absolute',
      marginTop: '-0.40rem',
      marginLeft: '2rem',
      width: '1.5rem',
      height: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.86rem',
      fontWeight: 700,
      color: '$white',
      borderRadius: '100%',
      border: '3px solid $gray900',
      background: '$green500',
    },
  },
});

export const CenteredHeaderContainer = styled(HeaderContainer, {
  justifyContent: 'center',
  alignItems: 'center',
});