import React from 'react';
import '../styles/Home.scss';
import Sidebar from '../components/Sidebar/Sidebar';
import Profile from '../components/Profile/Profile';
const UserProfile = () => {
  return (
    <div className='userContainer'>
      <Sidebar/>
      <Profile/>
    </div>
  )
}

export default UserProfile
