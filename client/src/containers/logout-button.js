import React from 'react';
import styled from 'react-emotion';
import { useApolloClient } from '@apollo/react-hooks';
 
export default function LogoutButton() {
  const client = useApolloClient();
  return (
    <StyledButton
      data-testid="logout-button"
      onClick={() => {
        client.writeData({ data: { isLoggedIn: false } });
        localStorage.clear();
      }}
    >
      Logout
    </StyledButton>
  );
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const StyledButton = styled('button')( {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer'
});
