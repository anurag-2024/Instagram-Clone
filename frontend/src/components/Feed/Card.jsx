import React,{useState} from 'react'
import "./card.scss"
import { MdMoreHoriz } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import save from "../../assets/save.png"
import share from "../../assets/share.png"
const post = ({post,cardkey}) => {
    const navigate=useNavigate();
    return (
        <div className="card">
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
                    <img src={post?.post} alt="" className="postImg" />
                </div>
                <div className="cardBottom">
                    <div className="cardBottomLeft">
                        <div>
                            <GoHeart className="likeIcon" />
                            <FaRegComment className="likeIcon" onClick={()=>navigate(`/p/${cardkey}`)}/>
                            <img src={share} alt="" className="likeIcon" />
                        </div>
                        <div>
                            <span className="cardlikeCounter">{post?.like} likes</span>
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
