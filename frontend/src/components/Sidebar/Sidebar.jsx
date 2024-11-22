import React ,{useState, useRef, useEffect} from 'react'
// import "./styles.scss"
import { useNavigate } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { IoSearchOutline,IoReorderThreeOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineExplore } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import { FaThreads } from "react-icons/fa6";
import More from '../More/More';
import Search from '../Search/Search';
import Create from './Create';
import CreatePost from '../Create/Create';
import img01 from "../../assets/profileimages/img01.jpg";
import { useSelector } from 'react-redux';
const Sidebar = ({ onCreateClick ,isCreateModalOpen}) => {
  const navigate = useNavigate();
  const user = useSelector(state => state?.auth?.user);
  const [more, setmore] = useState(false);
  const [search, setsearch] = useState(false);
  const [active, setactive] = useState([true,false,false,false,false,false,false,false,false,false]);
  const moreRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setmore(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick=(index)=>{
    let temp=[true,false,false,false,false,false,false,false,false,false];
    if(index===9){
      setmore(!more);
    }
    if(index===1){
      setsearch(!search);
    }
    if(index!==9&&search){
      setsearch(false);
    }
    if(index!==9&&more){
      setmore(false);
    }
    if(index!==0){
      temp[index]=!temp[index];
      temp[0]=!temp[0];
      setactive(temp);
    }
    else{
      temp[0]=true;
      setactive(temp);
    }
  }

  const handleMoreClose = () => {
    setmore(false);
    setactive(prev => {
      const newActive = [...prev];
      newActive[9] = false;
      newActive[0] = true;
      return newActive;
    });
  };

  return (
    <>
      <div className={`${search ? 'w-[72px]' : 'w-[72px] lg:w-[245px]'} h-screen fixed ${isCreateModalOpen ? '' : 'z-[99]'} bg-white transition-all duration-200 border-r border-gray-200`}>
        <div className="w-full h-full p-2.5">
          <div className="flex items-center cursor-pointer mb-8 pl-2.5">
            {search ? (
              <span className="hover:bg-gray-100 rounded-lg p-2.5" onClick={() => { handleClick(0); navigate("/") }}>
                <FaInstagram className="w-7 h-7" />
              </span>
            ) : (
              <>
                <span className="lg:hidden hover:bg-gray-100 rounded-lg p-2.5">
                  <FaInstagram className="w-7 h-7" />
                </span>
                <span 
                  className="hidden lg:block font-['Lobster'] text-3xl" 
                  style={{fontFamily:"'Lobster', cursive", marginTop:"2rem"}} 
                  onClick={() => navigate("/")}
                >
                  Instagram
                </span>
              </>
            )}
          </div>

          <ul className="flex flex-col space-y-2">
            <li 
              className={`flex items-center list-none cursor-pointer p-2.5 hover:bg-gray-100 rounded-lg
                ${active[0] ? "font-semibold" : ""}`} 
              onClick={() => { handleClick(0); navigate("/") }}
            >
              <GoHomeFill className="w-7 h-7" />
              {!search && <span className="ml-4 text-base hidden lg:block">Home</span>}
            </li>

            <li 
              className={`flex items-center list-none cursor-pointer p-2.5 hover:bg-gray-100 rounded-lg
                ${active[1] ? "font-semibold" : ""}`} 
              onClick={() => handleClick(1)}
            >
              <IoSearchOutline className="w-7 h-7" />
              {!search && <span className="ml-4 text-base hidden lg:block">Search</span>}
            </li>

            <li 
              className={`flex items-center list-none cursor-pointer p-2.5 hover:bg-gray-100 rounded-lg
                ${active[2] ? "font-semibold" : ""}`} 
              onClick={() => { handleClick(2); navigate("/explore") }}
            >
              <MdOutlineExplore className="w-7 h-7" />
              {!search && <span className="ml-4 text-base hidden lg:block">Explore</span>}
            </li>

            <li 
              className={`flex items-center list-none cursor-pointer p-2.5 hover:bg-gray-100 rounded-lg
                ${active[3] ? "font-semibold" : ""}`} 
              onClick={() => handleClick(3)}
            >
              <img width="24" height="24" className="w-7 h-7" src="https://img.icons8.com/ios/50/instagram-reel.png" alt="instagram-reel"/>
              {!search && <span className="ml-4 text-base hidden lg:block">Reels</span>}
            </li>

            <li 
              className={`flex items-center list-none cursor-pointer p-2.5 hover:bg-gray-100 rounded-lg
                ${active[4] ? "font-semibold" : ""}`} 
              onClick={() => handleClick(4)}
            >
              <RiMessengerLine className="w-7 h-7" />
              {!search && <span className="ml-4 text-base hidden lg:block">Messages</span>}
            </li>

            <li 
              className={`flex items-center list-none cursor-pointer p-2.5 hover:bg-gray-100 rounded-lg
                ${active[5] ? "font-semibold" : ""}`} 
              onClick={() => handleClick(5)}
            >
              <FiHeart className="w-7 h-7" />
              {!search && <span className="ml-4 text-base hidden lg:block">Notifications</span>}
            </li>

            <li 
              className={`flex items-center list-none cursor-pointer p-2.5 hover:bg-gray-100 rounded-lg
                ${active[6] ? "font-semibold" : ""}`} 
              onClick={() => handleClick(6)}
            >
              <Create className="w-7 h-7" />
              {!search && <span className="ml-4 text-base hidden lg:block" onClick={onCreateClick}>Create</span>}
            </li>

            <li 
              className={`flex items-center list-none cursor-pointer p-2.5 hover:bg-gray-100 rounded-lg
                ${active[7] ? "font-semibold" : ""}`} 
              onClick={() => { handleClick(7); navigate(`/user/${user?._id}`) }}
            >
              <img width="20" height="20" className="w-7 h-7 rounded-full" src={user?.profile||img01} alt="profile"/>
              {!search && <span className="ml-4 text-base hidden lg:block">Profile</span>}
            </li>

            <li 
              className={`flex items-center list-none cursor-pointer p-3.5 hover:bg-gray-100 rounded-lg mt-16
                ${active[8] ? "font-semibold" : ""}`} 
              onClick={() => handleClick(8)}
            >
              <FaThreads className="w-7 h-7" />
              {!search && (
                <a target="_blank" href='https://www.threads.net/' className="ml-4 text-base hidden lg:block">
                  Threads
                </a>
              )}
            </li>

            <li 
              className={`flex items-center list-none cursor-pointer p-2.5 hover:bg-gray-100 rounded-lg
                ${active[9] ? "font-semibold" : ""}`} 
              onClick={() => handleClick(9)}
            >
              <IoReorderThreeOutline className="w-7 h-7" />
              {!search && <span className="ml-4 text-base hidden lg:block">More</span>}
            </li>
          </ul>
        </div>
      </div>

      {more && <More onClose={handleMoreClose} />}

      {search && (
        <div className="fixed left-[72px] top-0 h-screen z-[98]">
          <Search />
        </div>
      )}
    </>
  )
}

export default Sidebar
