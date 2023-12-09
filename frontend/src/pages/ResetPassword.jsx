import React, { useEffect, useState } from 'react'
import "../styles/ResetPassword.scss"
import { Form } from 'reactstrap'
import reset1 from "../assets/login/reset1.png"
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import { resetValidation } from "../helper/validate";
import { useFormik } from "formik";
import axios from 'axios';
import { API_KEY } from '../utilis/config'
import { BASE_URL } from '../utilis/config';
import { useDispatch} from 'react-redux';
import { setEmail,setMobile } from '../Store/todoSlice.js';
const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        const loadingToast = toast.loading('Sending OTP...');
        try {
            const res = await axios.get(`${BASE_URL}/generateOTP`);
            if (res?.status === 201) {
                const value = res?.data?.code;
                console.log("Generated",value);
                const emailormobile = formik.values.emailormobile;
                if (emailormobile.includes("@")) {
                    const email = encodeURIComponent(emailormobile);
                    dispatch(setEmail({email:emailormobile}));
                    const response = await axios.post(`${BASE_URL}/registerMail`, { email: email, subject: "Reset Password OTP", username: "User", otp: value });
                    if (response.status === 200) {
                        toast.success("OTP Sent Successfully!", { id: loadingToast });
                        navigate("/otp");
                    }
                    else {
                        toast.error("OTP not Sent!!", { id: loadingToast });
                    }
                }
                else {
                    dispatch(setMobile({mobile:emailormobile}));
                    const response = await axios.post(`${BASE_URL}/verifyMobile`, { mobile: emailormobile });
                    if (response.status === 200) {
                        const encodedParams = new URLSearchParams();
                        encodedParams.set('to', `+91${emailormobile}`);
                        encodedParams.set('p', `${API_KEY}`);
                        encodedParams.set('text', 'Your OTP is ' + value);
                        const options = {
                            method: 'POST',
                            url: 'https://sms77io.p.rapidapi.com/sms',
                            headers: {
                                'content-type': 'application/x-www-form-urlencoded',
                                'X-RapidAPI-Key': '7658cc4c99msh4863d21e362a711p15cabcjsn82b6d3083eea',
                                'X-RapidAPI-Host': 'sms77io.p.rapidapi.com'
                            },
                            data: encodedParams,
                        };
                        try {
                            const response = await axios.request(options);
                            if (response.status === 200) {
                                toast.success("OTP Sent Successfully!", { id: loadingToast });
                                navigate("/otp");
                            }
                            else {
                                toast.error("OTP Sent!", { id: loadingToast });
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    else {
                        toast.error("Mobile number not registered yet!!", { id: loadingToast });
                    }
                }
            }
            else {
                toast.error("OTP not sent", { id: loadingToast });
                console.log({ message: "OTP not sent" });
            }
        }
        catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message, { id: loadingToast });
        }
    }
    const formik = useFormik({
        initialValues: {
            emailormobile: "",
        },
        validate: resetValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: handleSubmit,
    })

    return (
        <>
            <div className='resetPassword'>
                <Toaster position='top-center' reverseOrder={false}></Toaster>
                <div className='container'>
                    <div className='logo'>
                        <span>Instagram</span>
                    </div>
                    <div className='resetPasswordForm'>
                        <div className='resetPassword-img'>
                            <img src={reset1} alt="reset1" />
                        </div>
                        <div className='resetPassword-heading'>
                            <span>Trouble with logging in?</span>
                        </div>
                        <div className='resetPassword-text'>
                            <span>Enter your email, phone, or username and we'll send you a link to get back into your account.</span>
                        </div>

                        <Form onSubmit={formik.handleSubmit}>
                            <div className='resetPassword-input'>
                                <input {...formik.getFieldProps("emailormobile")} type="text" id='emailormobile' placeholder="Email or Phone" />
                            </div>
                            <div className='resetPassword-input'>
                                <button type='submit'>Send OTP</button>
                            </div>
                        </Form>

                        <div className='resetPassword-or'>
                            <div className='resetPassword-or-line'></div>
                            <div className='resetPassword-or-text'>OR</div>
                            <div className='resetPassword-or-line'></div>
                        </div>

                        <div className='resetPassword-newaccount'>
                            <span onClick={() => navigate("/register")}>Create New Account</span>
                        </div>
                        <div className='resetPassword-back'>
                            <span>Back to Login</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
