import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import { default as Button } from '../common/Button';
import Logo from '../../styles/Images/WhiteLogo.png';
import '../../styles/LessRenders/RenderHeader.less';

const LoginButton = () => {
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
      classType="header-button"
      buttonText="Log In"
    />
  );
};

const SignupButton = () => {
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
      classType="header-button"
      buttonText="Sign Up"
    />
  );
};

const LogoutButton = () => {
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
      classType="header-button"
      buttonText="Log Out"
    />
  );
};

function HeaderContent() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="header-content">
      <div className="hrf-logo">
        <a href="https://www.humanrightsfirst.org/">
          <Image src={Logo} preview={false} alt="HRF logo white" />
        </a>
      </div>
      <div className="navlink-container">
        <Link className="header-link" to="/">
          Home
        </Link>
        <Link className="header-link" to="/graphs">
          Graphs
        </Link>
        {!isAuthenticated && (
          <>
            <SignupButton />
            <LoginButton />
          </>
        )}
        {isAuthenticated && (
          <>
            <LogoutButton />
          </>
        )}
      </div>
    </div>
  );
}

export { HeaderContent };
