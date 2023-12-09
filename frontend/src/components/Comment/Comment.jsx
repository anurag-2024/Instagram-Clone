import React from 'react'
import img01 from "../../assets/profileimages/img01.jpg";
import { GoHeart } from "react-icons/go";
import { useSelector } from 'react-redux';
const Comment = () => {
    const username = useSelector((state) => state.username);
  return (
    <>
        <div className='comment'>
            <div className="comment-profile">
              <img src={img01} alt="" />
            </div>
            <div className="comment-content">
              <div className="comment-header">
                <span>{username}</span>
                <p>This is comment This is commentThis is comment</p>
              </div>
              <div className="comment-actions">
              <span className="comment-timestamp">49m</span>
                <span className="comment-action">
                  4 Likes
                </span>
                <span className="comment-action">
                  Reply
                </span>
              </div>  
            </div>
            <div className='commentlike'> 
              <GoHeart/>
            </div>
          </div>
    </>
      
  )
}

export default Comment
