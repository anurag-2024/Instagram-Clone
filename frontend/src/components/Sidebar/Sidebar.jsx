import React ,{useState} from 'react'
import "./styles.scss"
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
import ProfilePhoto from '../../assets/profile.jpeg';
import { useSelector } from 'react-redux';
const Sidebar = () => {
  const navigate = useNavigate();
  const username=useSelector(state=>state.username);
  const [more, setmore] = useState(false);
  const [search, setsearch] = useState(false);
  const [active, setactive] = useState([true,false,false,false,false,false,false,false,false,false]);
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
  return (
    <>
      <div className='sidebar'>
        <div className='sideWrapper'>
          <div className='logo'>
            {search?<span className='logoinsta' onClick={()=>{handleClick(0),navigate("/")}}><FaInstagram/></span>:<span onClick={()=>navigate("/")}>Instagram</span>}
          </div>
          <ul className='sideWrapperlistitems'>
              <li className={`sidebarlistItem ${active[0]?"active":""}`} onClick={()=>{handleClick(0),navigate("/")}}>
                <GoHomeFill className="sidebarIcon" />
                <span className="sidebarlistItemtext">Home</span>
            </li>
            {search&&<Search/>}
            <li className={`sidebarlistItem ${active[1]?"active":""}`} onClick={()=>handleClick(1)}>
                <IoSearchOutline className="sidebarIcon" />
                <span className="sidebarlistItemtext">Search</span>
            </li>
            <li className={`sidebarlistItem ${active[2]?"active":""}`} onClick={()=>{handleClick(2),navigate("/explore")}}>
                <MdOutlineExplore className="sidebarIcon" />
                <span className="sidebarlistItemtext">Explore</span>
            </li>
            <li className={`sidebarlistItem ${active[3]?"active":""}`} onClick={()=>handleClick(3)}>
            <img width="20" height="20"  className="sidebarIcon" src="https://img.icons8.com/ios/50/instagram-reel.png" alt="instagram-reel"/>
            <span className="sidebarlistItemtext">Reels</span>
            </li>
            <li className={`sidebarlistItem ${active[4]?"active":""}`} onClick={()=>handleClick(4)}>
            <RiMessengerLine className="sidebarIcon" />
            <span className="sidebarlistItemtext">Messages</span>
            </li>
            <li className={`sidebarlistItem ${active[5]?"active":""}`} onClick={()=>handleClick(5)}>
            <FiHeart className="sidebarIcon" />
            <span className="sidebarlistItemtext">Notifications</span>
            </li>
            <li className={`sidebarlistItem ${active[6]?"active":""}`} onClick={()=>handleClick(6)}>
            <Create className="sidebarIcon" />
            <span className="sidebarlistItemtext">Create</span>
            </li>
            <li className={`sidebarlistItem ${active[7]?"active":""}`} onClick={()=>{handleClick(7),navigate(`/${username}`)}}>
            <img width="20" height="20"  className="sidebarIcon" src={ProfilePhoto} alt="profile"/>
            <span className="sidebarlistItemtext">Profile</span>
            </li>
            <li className={`sidebarlistItem ${active[8]?"active":""}`} onClick={()=>{handleClick(8)}}>
              <FaThreads className="sidebarIcon" />
             <a  target="_blank" href='https://www.threads.net/'> <span className='sidebarlistItemtext'>Threads</span></a>
            </li>
            {more&&<More/>}
            <li className={`sidebarlistItem ${active[9]?"active":""}`} style={{marginBottom:"2rem"}} onClick={()=>handleClick(9)}>
            <IoReorderThreeOutline className='sidebarIcon'/>
            <span className='sidebarlistItemtext'>More</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
