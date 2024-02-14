import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import { LoginButton } from '../common/Buttons/Login';
import { LogoutButton } from '../common/Buttons/Logout';
import { SignupButton } from '../common/Buttons/Signup';
import Logo from '../../styles/Images/WhiteLogo.png';
import '../../styles/LessRenders/Layout/Header.less';

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
            <SignupButton className="header-button" />
            <LoginButton className="header-button" />
          </>
        )}
        {isAuthenticated && (
          <>
            <Link className="header-link" to="/profile">
              Profile
            </Link>
            <LogoutButton className="header-button" />
          </>
        )}
      </div>
    </div>
  );
}

export { HeaderContent };
