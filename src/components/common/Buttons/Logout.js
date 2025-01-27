import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../Button';

export const LogoutButton = ({ className }) => {
  const { logout } = useAuth0();
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button
      handleClick={handleLogout}
      isDisabled={false}
      classType={className}
      buttonText="Log Out"
    />
  );
};
