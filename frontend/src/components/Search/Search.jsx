import React from 'react'
import "./styles.scss"
import img01 from "../../assets/profileimages/img01.jpg";
import { useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
const Search = () => {
    const username = useSelector(state => state.username);
    const fullName = useSelector(state => state.fullName);
    return (
        <>
            <div className='search'>
                <div className='search-up'>
                    <div className='search-up__title'>
                        <span>Search</span>
                    </div>
                    <div className='search-up__input'>
                        <input type='text' placeholder='Search' />
                    </div>
                </div>
                <hr />
                <div className='search-down'>
                    <div className='search-down-wrapper'>
                        <div className='recent'>
                            <span>Recent</span>
                            <span className='clear'>Clear All</span>
                        </div>
                        <div className='recent__search'>

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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
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
                                    <RxCross2 />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search
