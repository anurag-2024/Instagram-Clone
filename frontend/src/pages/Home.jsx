import React,{useState} from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Feed from '../components/Feed/Feed'
import "../styles/Home.scss"
import Create from '../components/Create/Create'
const Home = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };
  const closeCreateModal=()=>{  
    setCreateModalOpen(false);
  }
  return (
    <div className={`homeContainer ${isCreateModalOpen &&'disablePointerEvents'}`}>
      <Sidebar onCreateClick={openCreateModal}/>
      <Feed/>
      <Create isOpen={isCreateModalOpen} onClose={closeCreateModal} />
    </div>
  )
}

export default Home
