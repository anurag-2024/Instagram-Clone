import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import img01 from "../../assets/profileimages/img01.jpg";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { createPost,getAllPosts } from '../../Store/slices/postSlice';
import toast, { Toaster } from 'react-hot-toast';
import EmojiPicker from 'emoji-picker-react';

const Create = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.post || {});
    const user = useSelector((state) => state.auth?.user);
    const username = user?.username;
    const [uploadedImage, setUploadedImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const [charcount, setCharcount] = useState(0);
    const [caption, setCaption] = useState(''); 
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
        
        if (file && allowedTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(file);
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error('Please upload only JPG, PNG, JPEG, or GIF images');
        }
    };

    const handleClose = () => {
        setUploadedImage(null);
        setBase64Image(null);
        setCaption('');
        setCharcount(0);
        onClose();
    };

    const handleChange = (e) => {
        setCharcount(e.target.value.length);
        setCaption(e.target.value);
    };

    const getBase64Image = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const handleSubmit = async () => {
        const loadingToast = toast.loading('Creating post...');
        try {
            const token = Cookies.get('token');
            const decoded = jwtDecode(token);
            const userId = decoded.userId;

            const data = {
                caption,
                userId,
                image: base64Image,
            };
            console.log(data);
            await dispatch(createPost(data)).unwrap();
            dispatch(getAllPosts({page: 1, limit: 10}));
            window.scrollTo(0,0);
            toast.dismiss(loadingToast);
            toast.success('Post created successfully!');
            setShowEmojiPicker(false);
            setTimeout(() => {
                handleClose();
            }, 800);    
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error(err.message || 'Failed to create post');
            console.error(err);
        }
    };

    const onEmojiClick = (emojiObject) => {
        const newCaption = caption + emojiObject.emoji;
        setCaption(newCaption);
        setCharcount(newCaption.length);
    };

    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const createElement = document.querySelector('.create');
            const uploadElement = document.querySelector('.upload');
            const targetElement = createElement || uploadElement;

            if (targetElement && !targetElement.contains(event.target) && 
                !event.target.closest('.body-blur') && 
                !event.target.closest('.cross-container')) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <>
                    <div className='body-blur'></div>
                    <div className='cross-container' onClick={handleClose}>
                        <RxCross2 className='cross' />
                    </div>
                    {uploadedImage ? (
                        <div className='upload'>
                            <div className='upload-head flex justify-between items-center'>
                                <span>Create New Post</span>
                                <button 
                                    onClick={handleSubmit} 
                                    disabled={loading} 
                                    className={`p-1 m-1 px-2 py-1 rounded-md bg-blue-500 text-white flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading && (
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    {loading ? 'Sharing...' : 'Share'}
                                </button>
                            </div>
                            <div className='upload-down'>
                                <div className='upload-left'>
                                    <img src={base64Image} alt='uploaded' />
                                </div>
                                <div className='upload-right'>
                                    <div className='upload-right-top'>
                                        <div className='feed-right-account'>
                                            <div className='feed-right-account-img'>
                                                <img src={img01} alt='' />
                                            </div>
                                            <div className='feed-right-account-text'>
                                                <div className='feed-right-account-username'>
                                                    <p>{username}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='upload-right-middle'>
                                        <textarea 
                                            maxLength="2200" 
                                            onChange={(e) => handleChange(e)}
                                            value={caption}
                                        />
                                    </div>
                                    <div className='upload-right-bottom'>
                                        <div className='upload-right-bottom-icons'>
                                            <div className='emoji-picker-wrapper'>
                                                <div className='upload-right-bottom-img' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                                    <svg aria-label="Emoji" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                                                </div>
                                            </div>
                                            <div className='charcount'>
                                                <span>{charcount}/2,200</span>
                                            </div>
                                        </div>
                                        {showEmojiPicker && (
                                            <>
                                                <div className='emoji-picker-overlay' onClick={() => setShowEmojiPicker(false)}></div>
                                                <EmojiPicker 
                                                    onEmojiClick={onEmojiClick}
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: '0%',
                                                        left: '18%',
                                                        zIndex: '9999',
                                                        boxShadow: '0 2px 16px rgba(0, 0, 0, 0.1)',
                                                        marginBottom: '8px'
                                                    }}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='create'>
                            <div className='create-head'>
                                <span>Create New Post</span>
                            </div>
                            <div className='create-body'>
                                <div className='create-body-logo'>
                                    <svg aria-label="Icon to represent media such as images or videos" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                                </div>
                                <div className='create-body-text'>
                                    <span>Drag photos and videos here</span>
                                </div>
                                <div className='submit'>
                                    <label htmlFor='upload'>
                                        <button onClick={() => document.getElementById('upload').click()} className='p-1 m-1 px-2 py-1 rounded-md bg-blue-500 text-white'>
                                            Select from Computer
                                        </button>
                                    </label>
                                    <input 
                                        onChange={handleFileChange} 
                                        type='file' 
                                        id='upload' 
                                        name='upload' 
                                        accept="image/jpeg,image/png,image/jpg,image/gif" 
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Create;
