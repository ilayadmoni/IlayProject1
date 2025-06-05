import React from 'react';
import Avatar from '@mui/material/Avatar';
import './Userinfo.css';



const picturestyle = {
  width: '120px',
  height: '120px',
  marginBottom: '50px'
};

function UserInfo({ currentUser }) {
  if (!currentUser) {
    return (
      <div className="userinfo-container">
        <Avatar
             src="\guest.jpg"
             alt="User"
             sx={picturestyle}
             onError={e => { e.target.onerror = null; e.target.src = '/favicon.ico'; }} />
        No user information available.
      </div>
    );
  }
  return (
    <div className="userinfo-container">
      <Avatar
         src={currentUser.photoURL}
         alt={currentUser.displayName || 'User'}
         sx={picturestyle}
         onError={e => { e.target.onerror = null; e.target.src = '/favicon.ico'; }} />
      <div className="userinfo-row">
        <span className="userinfo-data">{currentUser.displayName || 'No Name'}</span>
        <span className="userinfo-label">:שם משתמש</span>
      </div>
      <div className="userinfo-row">
        <span className="userinfo-data">{currentUser.email || 'No Email'}</span>
        <span className="userinfo-label">:מייל</span>
      </div>
    </div>
  );
}

export default UserInfo;
