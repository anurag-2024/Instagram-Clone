import React from 'react'
import { Icon } from '@iconify/react';
import { Container, Row, Col, Form, Button } from 'reactstrap'
import "../styles/Register.scss";
import toast, {Toaster} from "react-hot-toast";
import {useFormik} from "formik";
import {registerValidation} from "../helper/validate";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Store/slices/authSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);

    const handleSubmit = async () => {
        const loadingToast = toast.loading('Registering...');
        try {
            let email, mobile;
            if(formik.values.emailormobile.includes("@")) {
                email = formik.values.emailormobile;
            } else {
                mobile = formik.values.emailormobile;
            }

            const result = await dispatch(registerUser({ 
                username: formik.values.username, 
                password: formik.values.password, 
                fullName: formik.values.fullName, 
                email, 
                mobile 
            })).unwrap();

            toast.success("Registered Successfully!", {id: loadingToast});
            navigate("/login-redirected");
        } catch (err) {
            toast.error(err.message || "Registration Failed!", {id: loadingToast});
            console.error("Error during registration:", err);
        }
    }

    const formik = useFormik({
        initialValues: {
            emailormobile: "",
            fullName: "",
            username: "",
            password: "",
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: handleSubmit,
    });

    return (
        <>
            <div className='register'>
                <div className='register__box'>
                    <div className='register__side'>
                        <div className='register__form'>
                            <h1>Instagram</h1>
                            <p>Sign up to see photos and videos from your friends.</p>
                            <div className='register__facebook'>
                                <Icon className="icon" icon="devicon:facebook" /> <span>Log in with Facebook</span>
                            </div>
                            <div className='register__form-or'>
                                <div className='register__form-or-line'></div>
                                <div className='register__form-or-text'>OR</div>
                                <div className='register__form-or-line'></div>
                            </div>
                            <Form onSubmit={formik.handleSubmit}>
                                <div className='register__form-input'>
                                    <input  {...formik.getFieldProps('emailormobile')} id='email' placeholder='Mobile Number or Email' required  />
                                </div>
                                <div className='register__form-input'>
                                    <input {...formik.getFieldProps('fullName')} type='text' id='name' placeholder='Full Name' required  />
                                </div>
                                <div className='register__form-input'>
                                    <input  {...formik.getFieldProps('username')} type='text' id='username' placeholder='Username' required  />
                                </div>
                                <div className='register__form-input'>
                                    <input {...formik.getFieldProps('password')} type='password' id='password' placeholder='Password' required />
                                </div>
                                <div className='register__form-input password'>
                                    <Button type='submit'><span>Sign Up</span></Button>
                                </div>
                            </Form>
                            <div className='register__terms__before'>
                                <span>People who use our service may have uploaded your contact information to Instagram.<strong>Learn More</strong> </span>
                            </div>
                            <div className='register__terms'>
                                <span>By signing up, you agree to our <strong>Terms</strong> , <strong>Data Policy</strong> and <strong>Cookies Policy</strong> .</span>
                            </div>
                        </div>
                        <div className='register__signup'>
                            <span>Have an account? <a href='/login-redirected'>Log in</a></span>
                        </div>
                        <div className='register__get-app'>
                            <span>Get the app.</span>
                            <div className='register__get-app-imgs'>
                                <img src='https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png' alt=''></img>
                                <img src='https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png' alt=''></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Register
