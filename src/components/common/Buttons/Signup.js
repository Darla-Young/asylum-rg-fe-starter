import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../Button';

export const SignupButton = ({ className }) => {
  const { loginWithRedirect } = useAuth0();
  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/profile',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  return (
    <Button
      handleClick={handleSignUp}
      isDisabled={false}
      classType={className}
      buttonText="Sign Up"
    />
  );
};
