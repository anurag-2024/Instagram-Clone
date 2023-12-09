import React, { useEffect } from 'react'
import "../styles/Post.scss";
import Home from './Home.jsx';
import p01 from "../assets/feedimages/p09.jpg";
import img01 from "../assets/profileimages/img01.jpg";
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import share from "../assets/share.png";
import save from "../assets/save.png";
import { GoHeart } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import Comment from '../components/Comment/Comment.jsx';
import { useSelector } from 'react-redux';
const Post = () => {
  const username = useSelector((state) => state.username);
  const navigate = useNavigate();
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
      <div className='cross-container' onClick={() => navigate("/")}>
        <RxCross2 className='cross' />
      </div>
      <div className='body-blur'></div>
      <div className='post-container'>
        <div className='post-left'>
          <img src={p01} alt=''></img>
        </div>
        <div className='post-right'>
          <div className='post-right-top'>
            <div className='feed-right-account'>
              <div className='feed-right-account-img' onClick={() => navigate(`${username}`)}>
                <img src={img01} alt='' />
              </div>
              <div className='feed-right-account-text'>
                <div className='feed-right-account-username' onClick={() => navigate(`${username}`)}>
                  <p>{username}</p>
                </div>
              </div>
              <div className='feed-right-account-switch'>
                <span><BsThreeDots /></span>
              </div>
            </div>
          </div>
          <div className='post-right-comments'>
          <div className='comment'>
            <div className="comment-profile">
              <img src={img01} alt="" />
            </div>
            <div className="comment-content">
              <div className="comment-header">
                <span>{username}</span>
                <p>This is Caption</p>
              </div>
              <div className="comment-actions">
              <span className="comment-timestamp">20m</span>
              </div>  
            </div>
            <div className='commentlike'> 
              <GoHeart/>
            </div>
          </div>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          <Comment/>
          </div>
          <div className='post-right-likes'>
            <div className="cardBottomLeft">
              <div className='icons'>
                <GoHeart className="likeIcon" />
                <FaRegComment className="likeIcon" />
                <img src={share} alt="" className="likeIcon" />
              </div>
              <div>
                <span className="cardlikeCounter">123 likes</span>
              </div>
              <div className='cardcap'>
                <span className="cardCaptionname">2 minutes ago</span>
              </div>
            </div>
            <div className="cardBottomRight">
              <img src={save} className='save' alt='' />
            </div>
          </div>
          <div className='post-right-addcomments'>
            <div className='post-right-addcomments-img'>
              <svg aria-label="Emoji" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
            </div>
            <div className='post-right-addcomments-input'>
              <input type='text' placeholder='Add a comment...' />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Post
