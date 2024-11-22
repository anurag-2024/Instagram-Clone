import React,{useEffect, useState} from 'react'
import img01 from "../../assets/profileimages/img01.jpg";
import { MdMoreHoriz } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import save from "../../assets/save.png"
import share from "../../assets/share.png"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../Store/slices/postSlice';
import { useSelector } from 'react-redux';
const Card = ({post,cardkey}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [like,setLike]=useState(false);
    const [localLikes,setLocalLikes]=useState(post?.likes?.length || 0);
    const [hide,setHide]=useState(true);
    const {user}=useSelector((state)=>state.auth);
    const {likedPosts}=useSelector((state)=>state.post);
    const isLiked=likedPosts?.posts?.find((p)=>p?._id===post?._id);
    useEffect(()=>{
        if(isLiked){
            setLike(true);
        }
    },[isLiked])
    useEffect(()=>{
        if(!hide){
            setTimeout(() => {
                setHide(true);
            }, 800);
        }
    },[hide])
    const handleDoubleClick = async () => {
        if (!like) {
            setLike(true);
            setHide(false);
            setLocalLikes(prev => prev + 1);
            // Call API through Redux
            await dispatch(likePost(post._id));
        }
    }
    const handleClick = async () => {
        const newLikeState = !like;
        setLike(newLikeState);
        setLocalLikes(prev => newLikeState ? prev + 1 : prev - 1);
        
        // Call appropriate API based on new like state
        if (newLikeState) {
            await dispatch(likePost(post._id));
        } else {
            await dispatch(unlikePost(post._id));
        }
    }
    return (
        <div className="w-[100%] max-w-[500px] mx-auto my-5 border-b border-gray-300/30">
            <div className="p-2">
                {/* Card Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <img 
                            src={post?.userId?.profile || img01} 
                            alt="" 
                            className="w-8 h-8 rounded-full cursor-pointer mr-2" 
                        />
                        <Link to={`/user/${post?.userId?._id}`} className="font-bold mr-1 text-[#383838] hover:text-gray-600">
                            {post?.userId?.fullName}
                        </Link>
                        <span className="text-gray-600 mr-1">{post?.date}</span>
                        <span className="text-[#0095f6] cursor-pointer hover:text-blue-700">Follow</span>
                    </div>
                    <div className="cursor-pointer">
                        <MdMoreHoriz className="text-2xl" />
                    </div>
                </div>

                {/* Card Image */}
                <div className="relative">
                    <svg 
                        className={`w-32 h-42 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 
                            ${hide ? 'invisible opacity-0' : 'visible opacity-100 animate-heartBeat'}`}
                        aria-label="Like" 
                        viewBox="0 0 48 48"
                    >
                        <defs><linearGradient gradientTransform="rotate(35)" id="ig_heart_gradient"><stop offset="0%" stop-color="#FF7A00"></stop><stop offset="40%" stop-color="#FF0169"></stop><stop offset="100%" stop-color="#D300C5"></stop></linearGradient></defs><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" fill="url(#ig_heart_gradient)"></path></svg>
                    
                    <img 
                        src={post?.image} 
                        alt="" 
                        className="w-full h-full border border-gray-400 rounded"
                        onDoubleClick={handleDoubleClick}
                    />
                </div>

                {/* Card Actions */}
                <div className="mt-4 flex justify-between items-start">
                    <div className="flex flex-col space-y-2 flex-1">
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-4">
                            {like ? 
                                <FaHeart className="w-7 h-7 cursor-pointer text-red-500" onClick={handleClick} /> :
                                <GoHeart className="w-7 h-7 cursor-pointer" onClick={handleClick} />
                            }
                            <FaRegComment 
                                className="w-7 h-7 cursor-pointer" 
                                onClick={() => navigate(`/p/${post?._id}`)}
                            />
                            <img src={share} alt="" className="w-7 h-7 cursor-pointer" />
                        </div>

                        {/* Likes Count */}
                        <div className="font-semibold text-base cursor-pointer">
                            {localLikes} likes
                        </div>

                        {/* Caption */}
                        <div className="flex items-center space-x-2">
                            <Link 
                                to={`/profile/${post?.userId?._id}`} 
                                className="font-semibold text-[#383838] hover:text-gray-600"
                            >
                                {post?.userId?.username || post?.userId?.fullName}
                            </Link>
                            <span className="text-base">{post?.caption.substr(0,30)+(post?.caption?.length>30?'.........':'')}</span>
                        </div>

                        {/* Comments Link */}
                        <span 
                            className="text-gray-500 cursor-pointer hover:text-gray-700"
                            onClick={() => navigate(`/p/${post?._id}`)}
                        >
                            View all {post?.comments?.length} comments
                        </span>
                    </div>

                    {/* Save Button */}
                    <div className="ml-4">
                        <img src={save} alt="" className="w-7 h-7 cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
