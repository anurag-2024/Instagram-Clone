import React,{useState} from 'react'
import "../styles/Explore.scss"
import Sidebar from '../components/Sidebar/Sidebar'
import { useNavigate } from 'react-router-dom';
import {IoHeartOutline} from "react-icons/io5";
import {IoChatbubbleOutline} from "react-icons/io5";
import Create from '../components/Create/Create';
import { useSelector } from 'react-redux';
const Explore = () => {
    const navigate = useNavigate();
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
   const {posts}=useSelector((state)=>state.post);
   console.log(posts);
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
                        {posts?.map((post,index) => {
                            return (
                                <div className="exploreGridItem">
                                    <div className="imageContainer" onClick={()=>navigate(`/p/${post?._id}`)} >
                                        <img src={post?.image} alt="explore" />
                                        <div className="overlay">
                                            <div className="stats">
                                                <span><IoHeartOutline className="text-2xl"/> {post?.likes?.length || 0}</span>
                                                <span><IoChatbubbleOutline className="text-2xl"/> {post?.comments?.length || 0}</span>
                                            </div>
                                        </div>
                                    </div>
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
