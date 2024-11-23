import React, { useState, useEffect } from 'react'
import img01 from "../../assets/profileimages/img01.jpg";
import { images } from "./images";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import Card from "./Card.jsx"
// import Posts from '../../dummydata.js'
import Suggesstion from './Suggesstion.jsx';
import Carousel from '../carousel/Carousel.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Store/slices/authSlice.js";
import { getAllPosts,getUserPosts,getLikedPosts } from '../../Store/slices/postSlice';
import Skeleton from '@mui/material/Skeleton';

const Feed = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showleft, setShowleft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [page,setPage]=useState(1);
  const user = useSelector(state => state?.auth?.user);
  const { posts, loading, error,pagination,initialPostLoading } = useSelector(state => state?.post || {});
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allCaughtUp, setAllCaughtUp] = useState(false);

  useEffect(() => {
    // Initial load - reset posts
    dispatch(getAllPosts({page: 1, limit: 10}));
    dispatch(getLikedPosts());
  }, []); // Remove dispatch from dependencies to prevent multiple initial loads

  useEffect(() => {
    // Get user data from localStorage if not in Redux store
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        dispatch(setUser({ user: storedUser }));
      }
    }
  }, [dispatch, user]);

  const handleScrollStories = () => {
    const carousel = document.querySelector(".stories");
    if (!carousel) return;

    setShowleft(carousel.scrollLeft > 0);
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const showRight = carousel.scrollLeft < maxScrollLeft;
    setShowRight(showRight);
  };

  useEffect(() => {
    // Wait for component to mount and element to exist
    const carousel = document.querySelector(".stories");
    if (carousel) {
      carousel.addEventListener("scroll", handleScrollStories);
      
      // Initial check for arrows
      handleScrollStories();

      return () => {
        carousel.removeEventListener("scroll", handleScrollStories);
      };
    }
  }, []); // Empty dependency array since we only want this to run once on mount

  const handlerightarrow = () => {
    const carousel = document.querySelector(".stories");
    if (!carousel) return;

    carousel.scrollTo({
      left: carousel.scrollLeft + 600,
      behavior: "smooth",
    });
  };

  const handleleftarrow = () => {
    const carousel = document.querySelector(".stories");
    if (!carousel) return;

    carousel.scrollTo({
      left: carousel.scrollLeft - 600,
      behavior: "smooth",
    });
  };

  const handleScrollPosts = () => {
    if (isLoadingMore || !pagination?.hasNextPage) return;

    const cards = document.querySelector('.feed-cards');
    if (!cards) return;

    // Check if user has scrolled to the last few posts
    const lastPost = cards.querySelector('.feed-card:last-child');
    if (!lastPost) return;

    const lastPostOffset = lastPost.offsetTop + lastPost.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    
    // If we're near the end (about 2 posts from bottom)
    if (pageOffset > lastPostOffset - 1000) {
      setIsLoadingMore(true);
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (page > 1 && pagination?.hasNextPage) {
          // Only fetch next page if we're past page 1
          await dispatch(getAllPosts({ page, limit: 10, shouldAppend: true })); // Add shouldAppend flag
        }
        setIsLoadingMore(false);
        
        if (!pagination?.hasNextPage) {
          setAllCaughtUp(true);
        }
      } catch (error) {
        setIsLoadingMore(false);
      }
    };
    
    fetchPosts();
  }, [page]); // Remove dispatch from dependencies, only react to page changes

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPosts);
    return () => window.removeEventListener('scroll', handleScrollPosts);
  }, [isLoadingMore, pagination?.hasNextPage]);

  const handleViewOlderPosts = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const renderSkeletonLoaders = () => {
    return Array(5).fill(0).map((_, index) => (
      <div key={index} className="skeleton-card">
        <div className="skeleton-header">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="text" width={120} height={16} style={{ marginLeft: 8 }} />
        </div>
        <Skeleton variant="rectangular" width="100%" height={300} />
        <div className="skeleton-footer">
          <Skeleton variant="text" width="70%" height={16} />
          <Skeleton variant="text" width="50%" height={16} />
        </div>
      </div>
    ));
  };

  return (
    <div className="h-full w-[84%] ml-[16%] flex">
      {/* Main Feed Section */}
      <div className="h-full ml-[8%] mr-8 w-[55%]">
        {/* Stories Section */}
        <div className="relative">
          <div 
            className={`carouselLeftNav text-xl absolute cursor-pointer z-9 top-1/3 -translate-y-1/2 left-2 
              hover:opacity-75 transition-opacity duration-200 bg-gray-100/100 rounded-full
              ${!showleft ? 'hidden' : ''}`} 
            onClick={handleleftarrow}
          >
            <IoIosArrowDropleft className="text-gray-700" size={28} />
          </div>
          <div 
            className={`carouselRightNav text-xl absolute cursor-pointer z-9 top-1/3 -translate-y-1/2 right-2
              hover:opacity-75 transition-opacity duration-200 bg-gray-100/100 rounded-full
              ${!showRight ? 'hidden' : ''}`} 
            onClick={handlerightarrow}
          >
            <IoIosArrowDropright className="text-gray-700" size={28} />
          </div>
          <div className="stories h-24 w-full mt-8 flex gap-1 overflow-x-auto overflow-y-hidden no-scrollbar">
            <Carousel />
          </div>
        </div>

        {/* Feed Cards */}
        <div className="mt-2">
          <div className="space-y-1">
            {initialPostLoading ? (
              renderSkeletonLoaders()
            ) : (
                posts?.map((p, index) => (
                  <Card key={p._id || index} post={p} cardkey={index} />
                ))
            )}
          </div>

          {/* Loading and All Caught Up States */}
          {isLoadingMore && (
            <div className="flex flex-col items-center py-5">
              <div className="w-8 h-8 border-3 border-gray-200 border-t-gray-600 rounded-full animate-spin mb-2"></div>
              <p className="text-gray-600 text-sm">Loading more posts...</p>
            </div>
          )}

          {allCaughtUp && !isLoadingMore &&(
            <div className="flex flex-col items-center justify-center p-8 my-8 text-center bg-white rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center text-green-500 border-2 border-green-500 rounded-full bg-green-50 mb-4">✓</div>
              <h3 className="text-gray-800 text-lg font-semibold mb-2">You're all caught up</h3>
              <p className="text-gray-500 text-sm mb-6">You've seen all new posts</p>
              <div className="w-full border-b border-gray-200 relative">
                <span 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-white px-4 text-blue-500 text-sm font-semibold cursor-pointer hover:text-blue-700"
                  onClick={handleViewOlderPosts}
                >
                  View older posts
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[30%] ml-7 flex-shrink-0">
        {/* Account Section */}
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 cursor-pointer" onClick={() => navigate(`${user?.username}`)}>
              <img src={img01} alt="" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="ml-4 flex-grow max-w-[120px]">
              <p className="font-semibold text-sm cursor-pointer hover:text-gray-600 truncate" 
                onClick={() => navigate(`/user/${user?._id}`)}>
                {user?.username}
              </p>
              <p className="text-gray-500 text-sm truncate">{user?.fullName}</p>
            </div>
            <button className="text-blue-500 text-sm font-semibold hover:text-blue-700 ml-auto">
              Switch
            </button>
          </div>

          {/* Suggestions Section */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-semibold text-sm">Suggested For You</span>
              <button className="text-gray-900 text-xs font-semibold hover:text-gray-600">
                See All
              </button>
            </div>
            <div className="space-y-3">
              <Suggesstion username="itanyasharma" img={images[0]} name="ativrushti" />
              <Suggesstion username="nomadic_travel" img={images[9]} name="iam_nidhidixit" />
              <Suggesstion username="ativrushti" img={images[3]} name="itanyasharma" />
              <Suggesstion username="itz.abr" img={images[14]} name="dimplzz01" />
              <Suggesstion username="iam_nidhidixit" img={images[8]} name="f.a.i.z.01" />
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-xs text-gray-400">
            <div className="flex flex-wrap gap-x-2">
              {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations', 'Language', 'Meta Verified']
                .map((link, index) => (
                  <a key={index} 
                    href="#" 
                    className="hover:underline cursor-pointer"
                  >
                    {link}
                  </a>
                ))}
            </div>
            <p className="mt-4">© {year} INSTAGRAM FROM META</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed
