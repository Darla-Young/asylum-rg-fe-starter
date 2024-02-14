import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../Button';

export const LoginButton = ({ className }) => {
  const { loginWithRedirect } = useAuth0();
  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/profile',
      },
    });
  };

  return (
    <Button
      handleClick={handleLogin}
      isDisabled={false}
      classType={className}
      buttonText="Log In"
    />
  );
};
