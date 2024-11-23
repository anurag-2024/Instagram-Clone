import React, { useState, useEffect } from 'react';
import './profile.scss';
import Footer from "./Profile-Footer"
import { cards } from "../Feed/images"
import { IoIosSettings } from "react-icons/io";
import camera from "../../../src/assets/camera.png";
import img01 from "../../assets/profileimages/img01.jpg";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { IoHeartOutline } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import { getUser, clearUser } from '../../Store/slices/userSlice';
import { Skeleton } from '@mui/material';

const Profile = () => {
    const [active, setactive] = useState([true, false, false]);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector(state => state.user);
    useEffect(() => {
        if (id) {
            dispatch(getUser(id));
        }
        return () => {
            dispatch(clearUser());
        };
    }, [dispatch, id]);
    const handleClick = (index) => {
        let temp = [true, false, false];
        if (index !== 0) {
            temp[index] = !temp[index];
            temp[0] = !temp[0];
            setactive(temp);
        }
        else {
            temp[0] = true;
            setactive(temp);
        }
    }
    return (
        <>
            <div className='profile'>
                <div className='profile-up'>
                    <div className='profile-wrapper'>
                        <div className='profile-wrapper-up'>
                            <div className='profile-photo'>
                                <img src={user?.profile||img01} alt='profile' />
                            </div>
                            <div className='profile-desc'>
                                <div className='profile-desc-up'>
                                    <div className='username'>
                                        <span>{user?.username}</span>
                                    </div>
                                    <div className='edit-profile'>
                                        <span>Edit Profile</span>
                                    </div>
                                    <div className='archive'>
                                        <span> View archive</span>
                                        <IoIosSettings className='logoitem' />
                                    </div>
                                </div>
                                <div className='profile-desc-middle'>
                                    <div className='posts'>
                                        <span><span className='number'>{user?.post?.length||0}</span> Posts</span>
                                    </div>
                                    <div className='followers'>
                                        <span><span className='number'>{user?.followers?.length||0}</span> Followers</span>
                                    </div>
                                    <div className='following'>
                                        <span><span className='number'>{user?.following?.length||0}</span> Following</span>
                                    </div>
                                </div>
                                <div className='profile-desc-down'>
                                    <div className='fullname'>{user?.fullname}</div>
                                    <div className='bio'>
                                        <span>{user?.bio}</span>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='profile-highlights'>
                            <div className='highlights'>
                                <div className='highlight'>
                                    <div className='hightlight-photo'>
                                        <div className='hightlight-photo-circle'><img src={img01} alt='profile' /></div>
                                    </div>
                                    <div className='highlight-name'>
                                        <span>Highlights</span>
                                    </div>
                                </div>
                                <div className='highlight'>
                                    <div className='hightlight-photo'>
                                        <div className='hightlight-photo-circle'><img src={img01} alt='profile' /></div>
                                    </div>
                                    <div className='highlight-name'>
                                        <span>Highlights</span>
                                    </div>
                                </div>
                                <div className='highlight'>
                                    <div className='hightlight-photo'>
                                        <div className='hightlight-photo-circle'><img src={img01} alt='profile' /></div>
                                    </div>
                                    <div className='highlight-name'>
                                        <span>Highlights</span>
                                    </div>
                                </div>
                                <div className='highlight'>
                                    <div className='hightlight-photo'>
                                        <div className='hightlight-photo-circle'><img src={img01} alt='profile' /></div>
                                    </div>
                                    <div className='highlight-name'>
                                        <span>Highlights</span>
                                    </div>
                                </div>
                                <div className='highlight'>
                                    <div className='hightlight-photo'>
                                        <div className='hightlight-photo-circle'>  <svg aria-label="Plus icon" class="x1lliihq x1n2onr6 x10xgr34" fill="currentColor" height="44" role="img" viewBox="0 0 24 24" width="44"><title>Plus icon</title><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg></div>
                                    </div>
                                    <div className='highlight-name'>
                                        <span>New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='profile-down'>
                    <div className='profile-down-headings'>
                        <div className={`post-heading ${active[0] ? 'active' : ''}`} onClick={() => handleClick(0)}>
                            <svg aria-label="" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><rect fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                            <span>POSTS</span>
                        </div>
                        <div className={`saved-heading ${active[1] ? "active" : ""}`} onClick={() => handleClick(1)}>
                            <svg aria-label="" class="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                            <span>SAVED</span>
                        </div>
                        <div className={`tagged-heading ${active[2] ? "active" : ""}`} onClick={() => handleClick(2)}>
                            <svg aria-label="" class="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle></svg>
                            <span>TAGGED</span>
                        </div>
                    </div>
                    <div className='profile-down-posts'>
                        {active[0] && <div className='profile-down-posts-grid'>
                            {loading ? (
                                Array(6).fill(0).map((_, index) => (
                                    <div key={index} className="profile-down-posts-grid-item">
                                        <Skeleton
                                            variant="rectangular"
                                            animation="wave"
                                            width="100%"
                                            height="100%"
                                            sx={{
                                                aspectRatio: '1/1',
                                                backgroundColor: '#D1CBCB',
                                                '&::after': {
                                                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)'
                                                }
                                            }}
                                        />
                                    </div>
                                ))
                            ) : (
                                user?.post?.length > 0 ? user?.post?.map((post) => (
                                    <div key={post.id} className="profile-down-posts-grid-item" onClick={() => navigate(`/p/${post._id}`)} >
                                        <img src={post?.image} alt="explore" />
                                        <div className="overlay">
                                            <div className="stats">
                                                <span>
                                                    <IoHeartOutline />
                                                    {post?.likes?.length || 0}
                                                </span>
                                                <span>
                                                    <IoChatbubbleOutline />
                                                    {post?.comments?.length || 0}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )) : <>
                                    <div className='saved'>
                                        <div className='saved-photo'>
                                            <img src={camera} alt='camera' />
                                        </div>
                                        <div className='saved-text'>
                                            <span>No Posts Yet</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>}
                        {active[1] &&
                            <div className='saved'>
                                <div className='saved-photo'>
                                    <img src={camera} alt='camera' />
                                </div>
                                <div className='saved-text'>
                                    <span>No Saved Posts Yet</span>
                                </div>
                            </div>}
                        {active[2] &&
                            <div className='saved'>
                                <div className='saved-photo'>
                                    <img src={camera} alt='camera' />
                                </div>
                                <div className='saved-text'>
                                    <span>No Tagged Posts Yet</span>
                                </div>
                            </div>
                        }
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Profile
