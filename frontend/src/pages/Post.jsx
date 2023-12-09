import React,{useEffect} from 'react'
import "../styles/Post.scss";
import Home from './Home.jsx';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
const Post = () => {
    const navigate=useNavigate();
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, []);
    return (
        <>
            <div className='home'>
                <Home />
            </div>
            <div className='cross-container' onClick={()=>navigate("/")}>
                <RxCross2 className='cross' />
            </div>
            <div className='body-blur'></div>

            <div className='post'>
                <div className='post-left'>
                </div>
                <div className='post-right'>
                </div>
            </div>
        </>
    )
}

export default Post
