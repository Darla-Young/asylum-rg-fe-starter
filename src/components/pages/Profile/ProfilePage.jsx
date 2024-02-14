import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import 'antd/dist/antd.css';
import '../../../styles/LessRenders/Pages/ProfilePage.less';
import { LoginButton } from '../../common/Buttons/Login';
import { SignupButton } from '../../common/Buttons/Signup';

function ProfilePage(props) {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated && <h1>Welcome {/* get username */}!</h1>}
      {!isAuthenticated && (
        <div id="profile-container">
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
