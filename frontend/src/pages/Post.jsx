import React, { useEffect,useState } from 'react'
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
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import Comment from '../components/Comment/Comment.jsx';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likePost, unlikePost,getPost,commentPost ,clearPost} from '../Store/slices/postSlice';
import EmojiPicker from 'emoji-picker-react';
import toast from 'react-hot-toast';
import { getRelativeTime } from '../utils/time';
import { Skeleton } from '@mui/material';
import { FaRegFaceSmile } from "react-icons/fa6";

const Post = () => {
  const {postId}=useParams();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [hide,setHide]=useState(true);
  const [like,setLike]=useState(false);
  const {user}=useSelector((state)=>state.auth);
  const {post,loading,error}=useSelector((state)=>state.post);
  const {likedPosts}=useSelector((state)=>state.post);
  const isLiked=likedPosts.posts?.find((p)=>p?._id===post?.post?._id);
  useEffect(()=>{
    if(isLiked){
      setLike(true);
    }
  },[isLiked]);
  const [localLikes,setLocalLikes]=useState(post?.likes?.length || 0);
  const localPost=post?.post;
  useEffect(()=>{
    setLocalLikes(localPost?.likes?.length || 0);
  },[localPost]);
  useEffect(()=>{
    dispatch(getPost(postId));
  },[postId]);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  useEffect(()=>{
      if(!hide){
          setTimeout(() => {
              setHide(true);
          }, 800);
      }
  },[hide])
  const handleDoubleClick = async () => {
    if (!isLiked) {
      setLike(true);
      setHide(false);
      setLocalLikes(prev => prev + 1);
      await dispatch(likePost(postId));
    }
  }
  const handleClick = async () => {
    const newLikeState = !like;
    setLike(newLikeState);
    setLocalLikes(prev => newLikeState ? prev + 1 : prev - 1);
    
    try {
      if (newLikeState) {
        await dispatch(likePost(postId));
      } else {
        await dispatch(unlikePost(postId));
      }
    } catch (error) {
      setLike(!newLikeState);
      setLocalLikes(prev => newLikeState ? prev - 1 : prev + 1);
    }
  }
  const [comment,setComment]=useState("");
  const [localComments, setLocalComments] = useState([]);
  
  useEffect(() => {
    setLocalComments(localPost?.comments || []);
  }, [localPost]);

  const handleAddComment = () => {
    const newComment = {
      _id: Date.now(),
      comment: comment,
      userId: {
        username: user?.username,
        profile: user?.profile||img01,
        fullName: user?.fullName
      },
      createdAt: new Date().toISOString(),
      likes: []
    };

    setLocalComments(prev => [...prev, newComment]);
    
    dispatch(commentPost({comment: comment, postId: postId}));
    setComment("");
    setShowEmojiPicker(false);
  }
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (emojiObject) => {
    const newComment = comment + emojiObject.emoji;
    setComment(newComment);
  };
  const handleCrossClick = () => {
    dispatch(clearPost());
    navigate(-1);
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0">
        <Home />
      </div>
      <div className="fixed inset-0 bg-black/50 z-20 pointer-events-auto" />
      <div 
        className="fixed top-0 right-0 w-20 h-20 flex justify-end p-4 z-40 cursor-pointer pointer-events-auto" 
        onClick={handleCrossClick}
      >
        <RxCross2 className="w-8 h-8 text-white" />
      </div>
      <div className="fixed top-[5%] left-[10%] w-[80%] h-[90%] rounded bg-white z-30 flex pointer-events-auto overflow-hidden">
        {!localPost ? (
          <div className='post-container'>
            <div className='post-left'>
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height="100%" 
                animation="wave"
              />
            </div>
            <div className='post-right'>
              <div className='post-right-top'>
                <div className='feed-right-account'>
                  <div className='feed-right-account-img'>
                    <Skeleton 
                      variant="circular" 
                      width={32} 
                      height={32} 
                      animation="wave"
                    />
                  </div>
                  <div className='feed-right-account-text'>
                    <Skeleton 
                      variant="text" 
                      width={100} 
                      animation="wave"
                    />
                  </div>
                  <div className='feed-right-account-switch'>
                    <Skeleton 
                      variant="text" 
                      width={20} 
                      animation="wave"
                    />
                  </div>
                </div>
              </div>
              <div className='post-right-comments'>
                <div className='comment'>
                  <div className="comment-profile">
                    <Skeleton 
                      variant="circular" 
                      width={32} 
                      height={32} 
                      animation="wave"
                    />
                  </div>
                  <div className="comment-content" style={{ width: '100%' }}>
                    <Skeleton 
                      variant="text" 
                      width="90%" 
                      animation="wave"
                    />
                    <Skeleton 
                      variant="text" 
                      width="40%" 
                      animation="wave"
                    />
                  </div>
                </div>
                {[1, 2, 3].map((item) => (
                  <div key={item} className='comment'>
                    <div className="comment-profile">
                      <Skeleton 
                        variant="circular" 
                        width={32} 
                        height={32} 
                        animation="wave"
                      />
                    </div>
                    <div className="comment-content" style={{ width: '100%' }}>
                      <Skeleton 
                        variant="text" 
                        width="80%" 
                        animation="wave"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className='post-right-likes'>
                <div className="cardBottomLeft">
                  <div className='icons'>
                    {[1, 2, 3].map((item) => (
                      <Skeleton 
                        key={item}
                        variant="circular" 
                        width={24} 
                        height={24} 
                        animation="wave"
                        style={{ marginRight: '10px' }}
                      />
                    ))}
                  </div>
                  <Skeleton 
                    variant="text" 
                    width={80} 
                    animation="wave"
                  />
                  <Skeleton 
                    variant="text" 
                    width={120} 
                    animation="wave"
                  />
                </div>
                <div className="cardBottomRight">
                  <Skeleton 
                    variant="circular" 
                    width={24} 
                    height={24} 
                    animation="wave"
                  />
                </div>
              </div>
              <div className='post-right-addcomments'>
                <Skeleton 
                  variant="rectangular" 
                  width="100%" 
                  height={40} 
                  animation="wave"
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Left side - Image */}
            <div className="w-[60%] h-full relative">
              <svg className={`w-32 h-32 fill-[#ff3366] absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${hide ? 'opacity-0 invisible' : 'opacity-100 visible translate-y-[-50px] animate-heartBeat'}`}>
                <defs><linearGradient gradientTransform="rotate(35)" id="ig_heart_gradient"><stop offset="0%" stop-color="#FF7A00"></stop><stop offset="40%" stop-color="#FF0169"></stop><stop offset="100%" stop-color="#D300C5"></stop></linearGradient></defs><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" fill="url(#ig_heart_gradient)"></path></svg>
              <img 
                src={localPost?.image} 
                alt="" 
                className="w-full h-full object-cover"
                onDoubleClick={handleDoubleClick}
              />
            </div>

            {/* Right side */}
            <div className="w-[40%] h-full flex flex-col">
              {/* Header */}
              <div className="h-[10%] border-b border-black/10">
                <div className="flex items-center h-full px-4">
                  <div className="cursor-pointer" onClick={() => navigate(`${localPost?.userId?.username}`)}>
                    <img 
                      src={localPost?.userId?.profile || img01} 
                      alt="" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-grow">
                    <p className="font-semibold cursor-pointer hover:opacity-80">
                      {localPost?.userId?.username || localPost?.userId?.fullName}
                    </p>
                  </div>
                  <div className="cursor-pointer">
                    <BsThreeDots className="text-xl" />
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="h-[67%] overflow-y-auto border-b border-black/10">
                {/* Post Caption */}
                <div className="flex p-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={localPost?.userId?.profile || img01} 
                      alt="" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-grow">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-sm">
                        {localPost?.userId?.username}
                      </span>
                      <p className="text-sm">{localPost?.caption}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {getRelativeTime(localPost?.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Comments */}
                {localComments.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
              </div>

              {/* Actions Section */}
              <div className="p-4 border-b border-black/10">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    {like ? 
                      <FaHeart className="w-6 h-6 text-red-500 cursor-pointer" onClick={handleClick} /> : 
                      <GoHeart className="w-6 h-6 cursor-pointer" onClick={handleClick} />
                    }
                    <FaRegComment className="w-6 h-6 cursor-pointer" />
                    <img src={share} alt="" className="w-6 h-6 cursor-pointer" />
                  </div>
                  <img src={save} alt="" className="w-6 h-6 cursor-pointer" />
                </div>
                <p className="font-semibold mt-2">{localLikes} likes</p>
                <p className="text-xs text-gray-500 mt-1">
                  {getRelativeTime(localPost?.createdAt)}
                </p>
              </div>

              {/* Add Comment Section */}
              <div className="p-4 flex items-center gap-3">
                <button 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-xl text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  <FaRegFaceSmile className="w-6 h-6" />
                </button>
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  value={comment} 
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-grow outline-none text-sm"
                />
                <button 
                  disabled={!comment} 
                  onClick={handleAddComment}
                  className={`text-blue-500 font-semibold text-sm ${!comment ? 'opacity-30' : 'hover:text-blue-700'}`}
                >
                  Post
                </button>

                {/* Emoji Picker Overlay */}
                {showEmojiPicker && (
                  <>
                    <div 
                      className="fixed inset-0 z-[1001]" 
                      onClick={() => setShowEmojiPicker(false)}
                    />
                    <div className="absolute bottom-12 left-0 z-[1002]">
                      <EmojiPicker 
                        onEmojiClick={onEmojiClick}
                        theme="light"
                        width={320}
                        height={350}
                        searchDisabled
                        skinTonesDisabled
                        previewConfig={{ showPreview: false }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Post
