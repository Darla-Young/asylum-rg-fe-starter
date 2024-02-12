import React from 'react';
import 'antd/dist/antd.css';
import { colors } from '../../../styles/data_vis_colors';

const { background_color } = colors;

function ProfilePage(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: background_color,
      }}
    >
      <label>
        username: <h1>Welcome {/* get username */}!</h1>
      </label>
    </div>
  );
}

export default ProfilePage;
