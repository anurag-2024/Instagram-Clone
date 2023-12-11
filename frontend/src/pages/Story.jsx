import React,{useState,useEffect} from 'react'
import "../styles/Story.scss"
import { RxCross2 } from "react-icons/rx"
import { useNavigate } from 'react-router-dom'
import { BsThreeDots } from "react-icons/bs"
import img01 from "../assets/profileimages/img01.jpg"
import { GoHeart } from "react-icons/go";
import p01 from "../assets/feedimages/p01.jpg"
import { useParams } from 'react-router-dom'
const Story = () => {
    const {username} = useParams();
    const navigate = useNavigate();
    const [animationEnded, setAnimationEnded] = useState(false);

    const handleAnimationEnd = () => {
        setAnimationEnded(true);
    }
    useEffect(() => {
      if (animationEnded) {
        navigate('/');
      }
    }, [animationEnded]);
  
    return (
        <>
            <div className='blur-background'></div>
            <div className='insta'>
                <span onClick={() => navigate("/")}>Instagram</span>
            </div>
            <div className='cross-container' onClick={() => navigate("/")}>
                <RxCross2 className='cross' />
            </div>

            <div className='story-container'>
             <div className='story-line'>
                <div className='story-line-1' onAnimationEnd={handleAnimationEnd}></div>
             </div>
             <div className='story-profile'>
             <div className='story-profile-right'>
             <div className='feed-right-account-img' onClick={() => navigate(`/${username}`)}>
                <img src={img01} alt='' />
              </div>
              <div className='feed-right-account-text'>
                <div className='feed-right-account-username' onClick={() => navigate(`/${username}`)}>
                  <p>{username}</p>
                </div>
                <div className='story-time'>
                    <p>1h</p>
                </div>
              </div>
              </div>
              <div className='feed-right-account-switch'>
                <span><BsThreeDots /></span>
              </div>
             </div>
             <div className='story-content'>
               <div className='story-content-img'>
                     <img src={p01} alt='' />
               </div>
             </div>
             <div className='story-footer'>
                <div className='story-footer-left'>
                    <input type='text' placeholder={`Reply to ${username}`} />
                </div>
                <div className='story-footer-right'>
                    <GoHeart/>
                    <svg aria-label="Direct" class="x1lliihq x1n2onr6 xq3z1fi" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Direct</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                </div>
             </div>
            </div>
        </>
    )
}

export default Story
