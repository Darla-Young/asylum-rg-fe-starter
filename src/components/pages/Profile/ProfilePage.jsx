import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import 'antd/dist/antd.css';
import '../../../styles/LessRenders/Pages/ProfilePage.less';
import { LoginButton } from '../../common/Buttons/Login';
import { SignupButton } from '../../common/Buttons/Signup';

function ProfilePage(props) {
  const { isAuthenticated, user } = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <div id="profile-container">
          <h1>Welcome {user.nickname}!</h1>
          <div className="profile-info">
            <h2>User Profile:</h2>
            <img src={user.picture} alt="Avatar" />
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      )}
      {!isAuthenticated && (
        <div id="nouser-container">
          <h1>To view this page, please choose an option: </h1>
          <div className="button-container">
            <LoginButton />
            <SignupButton />
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
