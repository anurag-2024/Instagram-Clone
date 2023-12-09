import React from 'react'
import { Icon } from '@iconify/react';
import { Container, Row, Col, Form, Button } from 'reactstrap'
import LoginForm from '../components/LoginComponent/Form';
import "../styles/Login.scss";
const LoginRedirected = () => {
  return (
    <>
        <section className='login' style={{height:"10vh",marginLeft:"calc(50vw - 80vh)",marginTop:"4.5rem"}}>
                <div>
                    <div className='login__box'>
                        <div className='login__side'>
                            <div className='login__form'>
                                <h1>Instagram</h1>
                                <LoginForm/>
                                <div className='login__form-or'>
                                    <div className='login__form-or-line'></div>
                                    <div className='login__form-or-text'>OR</div>
                                    <div className='login__form-or-line'></div>
                                </div>
                                <div className='login__facebook'>
                                     <Icon  className="icon" icon="devicon:facebook" /> <span>Log in with Facebook</span>
                                </div>
                                <div className='login__forgot'>
                                    <a href='/reset-password'>Forgot password?</a>
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

export default LoginRedirected
