import React, { useEffect, useState } from 'react'
import "../styles/Login.scss";
import { Container, Row, Col, Form, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginComponent/Form';
import login1 from "../assets/login/login1.png";
import login2 from "../assets/login/login2.png";
import login3 from "../assets/login/login3.png";
import login4 from "../assets/login/login4.png";
import login5 from "../assets/login/login5.png";
import { Icon } from '@iconify/react';
const Login = () => {
    const navigate = useNavigate();
    const [img, setImg] = useState(login2);
    const [isTransitioning, setIsTransitioning] = useState(false);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsTransitioning(true);
            const setRandomImage = () => {
                const imgArr = [login2, login3, login4, login5];
                const currentIndex = imgArr.indexOf(img);
                const nextIndex = (currentIndex + 1) % imgArr.length;
                setImg(imgArr[nextIndex]);
            };
            setRandomImage();
        }, 3500);
        return () => clearInterval(intervalId);
    }, [img]);
    return (
        <>
            <section className='login'>
                <div>
                    <div className='login__box'>

                        <div className='login__img-box'>
                            <img src={login1} alt=''></img>
                            <div className={`login__img-box-img ${isTransitioning ? "transitioning" : ""}`} onTransitionEnd={() => setIsTransitioning(false)}>
                                <img src={img} alt=''></img>
                            </div>
                        </div>
                        <div className='login__side'>
                            <div className='login__form'>
                                <h1>Instagram</h1>
                                <LoginForm />
                                <div className='login__form-or'>
                                    <div className='login__form-or-line'></div>
                                    <div className='login__form-or-text'>OR</div>
                                    <div className='login__form-or-line'></div>
                                </div>
                                <div className='login__facebook'>
                                     <Icon  className="icon" icon="devicon:facebook" /> <span>Log in with Facebook</span>
                                </div>
                                <div className='login__forgot'>
                                    <span onClick={()=>navigate("/reset-password")}>Forgotten your password?</span>
                                </div>
                            </div>
                            <div className='alternate'>
                                <p>Don't have an account? <a href='/register'>Sign up</a></p>
                            </div>
                            <div className='login__get-app'>
                                <p>Get the app.</p>
                                <div className='login__get-app-imgs'>
                                    <img src='https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png' alt=''></img>
                                    <img src='https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png' alt=''></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
