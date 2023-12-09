import React, { useState, useEffect } from 'react'
import "./styles.scss"
import img01 from "../../assets/profileimages/img01.jpg";
import { images } from "./images";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import Card from "./Card.jsx"
import Posts from '../../dummydata.js'
import Suggesstion from './Suggesstion.jsx';
import Carousel from '../carousel/Carousel.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utilis/config.js';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../../Store/todoSlice.js";
const Feed = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showleft, setShowleft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const token = Cookies.get("token");
  const decoded = jwtDecode(token);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${BASE_URL}/user/${decoded?.userId}`);
      setUsername(res?.data?.data?.username);
      setFullName(res?.data?.data?.fullName);
      dispatch(login({ username: res?.data?.data?.username, fullName: res?.data?.data?.fullName }));
    }
    fetchData();
  }, [token]);


  const handlerightarrow = () => {
    const carousel = document.querySelector(".stories");
    carousel.scrollTo({
      left: carousel.scrollLeft + 600,
      behavior: "smooth",
    });
  };
  const handleleftarrow = () => {
    const carousel = document.querySelector(".stories");
    carousel.scrollTo({
      left: carousel.scrollLeft - 600,
      behavior: "smooth",
    });
  }
  const handleScroll = () => {
    const carousel = document.querySelector(".stories");
    setShowleft(carousel.scrollLeft > 0);
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const showRight = carousel.scrollLeft < maxScrollLeft;
    setShowRight(showRight);
  };
  useEffect(() => {
    const carousel = document.querySelector(".stories");
    carousel.addEventListener("scroll", handleScroll);
    return () => {
      carousel.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className='feed'>
        <div className='main'>
          <div className='stories-wrapper'>
            <div className='stories'>
              <div className={`carouselLeftNav arrow ${!showleft ? 'visibility-hidden' : ''}`} onClick={handleleftarrow}><IoIosArrowDropleft /></div>
              <div className={`carouselRightNav arrow ${!showRight ? 'visibility-hidden' : ''}`} onClick={handlerightarrow}><IoIosArrowDropright /></div>
              <Carousel />
            </div>

            <div className='main-feed'>
              <div className='feed-cards'>
                <div className='feed-card'>
                  {
                    Posts.map((p, index) => (
                      <Card key={index} post={p} cardkey={index} />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='feed-right'>
          <div>
            <div className='feed-right-account'>
              <div className='feed-right-account-img' onClick={() => navigate(`${username}`)}>
                <img src={img01} alt='' />
              </div>
              <div className='feed-right-account-text'>
                <div className='feed-right-account-username' onClick={() => navigate(`${username}`)}>
                  <p>{username}</p>
                </div>
                <div className='feed-right-account-name'>
                  <p>{fullName}</p>
                </div>
              </div>
              <div className='feed-right-account-switch'>
                <p>Switch</p>
              </div>
            </div>
            <div className='feed-right-suggesstion'>
              <div className='feed-right-suggesstion-header'>
                <div className='feed-right-suggesstion-text'>
                  <p>Suggested For You</p>
                </div>
                <div className='feed-right-suggesstion-seeall'>
                  <p>See All</p>
                </div>
              </div>
              <div className='feed-right-suggesstion-list'>
                <Suggesstion username="itanyasharma" img={images[0]} name="ativrushti" />
                <Suggesstion username="nomadic_travel" img={images[9]} name="iam_nidhidixit" />
                <Suggesstion username="ativrushti" img={images[3]} name="itanyasharma" />
                <Suggesstion username="itz.abr" img={images[14]} name="dimplzz01" />
                <Suggesstion username="iam_nidhidixit" img={images[8]} name="f.a.i.z.01" />
              </div>
            </div>
            <div className='feed-right-footer'>
              <div className='feed-right-footer-content'>
                <a href='https://about.instagram.com/' target='_blank'>About </a>
                <a href='https://help.instagram.com/' target='_blank'>Help </a>
                <a href='https://about.instagram.com/en_US/blog' target='_blank'>Press </a>
                <a href='https://developers.facebook.com/docs/instagram' target='_blank'>API </a>
                <a href='https://about.instagram.com/about-us/careers' target='_blank'>Jobs </a>
                <a href='https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect' target='_blank'>Privacy </a>
                <a href='https://help.instagram.com/581066165581870/' target='_blank'>Terms </a>
                <a href='https://www.instagram.com/explore/locations/' target='_blank'>Locations </a>
                <a>Language </a>
                <a href='https://about.meta.com/technologies/meta-verified/' target='_blank'>Meta Verified </a>
              </div>
              <div className='feed-right-footer-p'>
                <p>© {year} INSTAGRAM FROM META</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Feed
