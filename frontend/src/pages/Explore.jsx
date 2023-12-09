import React,{useState} from 'react'
import "../styles/Explore.scss"
import { cards } from "../components/Feed/images"
import Sidebar from '../components/Sidebar/Sidebar'
import { useNavigate } from 'react-router-dom';
import Create from '../components/Create/Create';
const Explore = () => {
    const navigate = useNavigate();
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };
  const closeCreateModal=()=>{  
    setCreateModalOpen(false);
  }
    return (
        <> <div className={`page ${isCreateModalOpen ? 'disablePointerEvents' : ''}`}>
            <Sidebar onCreateClick={openCreateModal} />
            <div className="explore">
                <div className="exploreWrapper">
                    <div className="exploreGrid">
                        {cards.map((card,index) => {
                            return (
                                <div className="exploreGridItem">
                                    <img src={card} alt="explore" onClick={()=>navigate(`/p/${index}`)}  />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Create isOpen={isCreateModalOpen} onClose={closeCreateModal} />
        </div>
        </>
    )
}

export default Explore
