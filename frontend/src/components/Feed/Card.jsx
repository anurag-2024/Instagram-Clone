import React,{useEffect, useState} from 'react'
import "./card.scss"
import { MdMoreHoriz } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import save from "../../assets/save.png"
import share from "../../assets/share.png"
const post = ({post,cardkey}) => {
    const navigate=useNavigate();
    const [like,setLike]=useState(false);
    const [likeCount,setLikeCount]=useState(post?.like);
    const [hide,setHide]=useState(true);
    useEffect(()=>{
        if(!hide){
            setTimeout(() => {
                setHide(true);
            }, 800);
        }
    },[hide])
    const handleDoubleClick=()=>{
        setLike(true);
        setHide(false);
        if(!like){
            setLikeCount(likeCount+1);
        }
    }
    const handleClick=()=>{
        setLike(!like);
        if(!like){
            setLikeCount(likeCount+1);
        }
        else{
            setLikeCount(likeCount-1);
        }
    }
    return (
        <div className="Card">
            <div className="cardWrapper">
                <div className="cardTop">
                    <div className="cardTopLeft">
                        <img src={post?.photo} alt="" className="postProfileImg" />
                        <span className="cardProfileUsername">Anurag Patel </span>
                        <span className="cardDate">{post?.date}</span>
                        <span className="cardFollow"> Follow</span>
                    </div>
                    <div className="cardTopRight">
                        <MdMoreHoriz />
                    </div>
                </div>
                <div className="cardCenter">
                <svg className={hide?"likedimg" :"likedimg hide"} aria-label="Like" viewBox="0 0 48 48" width="128"><defs><linearGradient gradientTransform="rotate(35)" id="ig_heart_gradient"><stop offset="0%" stop-color="#FF7A00"></stop><stop offset="40%" stop-color="#FF0169"></stop><stop offset="100%" stop-color="#D300C5"></stop></linearGradient></defs><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" fill="url(#ig_heart_gradient)"></path></svg>
                    <img src={post?.post} alt="" className="postImg" onDoubleClick={handleDoubleClick} />
                </div>
                <div className="cardBottom">
                    <div className="cardBottomLeft">
                        <div>
                        {like?<FaHeart className="likeIcon liked" onClick={handleClick} />:<GoHeart className="likeIcon" onClick={handleClick} />}
                            <FaRegComment className="likeIcon" onClick={()=>navigate(`/p/${cardkey}`)}/>
                            <img src={share} alt="" className="likeIcon" />
                        </div>
                        <div>
                            <span className="cardlikeCounter">{likeCount} likes</span>
                        </div>
                        <div className='cardcap'>
                            <span className="cardCaptionname">anurag_patel_</span>
                            <span className="cardCaption">{post?.desc}</span>
                        </div>
                        <div>
                            <span className="cardCaptionComment" onClick={()=>navigate(`/p/${cardkey}`)}>View all {post?.Comments} comments</span>
                        </div>
                    </div>
                    <div className="cardBottomRight">
                        <img src={save} className='save' alt=''  />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default post
