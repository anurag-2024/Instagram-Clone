import React, { useState } from 'react';
import '../styles/Home.scss';
import Sidebar from '../components/Sidebar/Sidebar';
import Profile from '../components/Profile/Profile';
import Create from '../components/Create/Create';
const UserProfile = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const openCreateModal = () => {
    setCreateModalOpen(!isCreateModalOpen);
  };
  const closeCreateModal=()=>{  
    setCreateModalOpen(false);
  }
  return (
    <div className='userContainer'>
      <Sidebar onCreateClick={openCreateModal}/>
      <Profile/>
      <Create isOpen={isCreateModalOpen} onClose={closeCreateModal} />
    </div>
  )
}

export default UserProfile
