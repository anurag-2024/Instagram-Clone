import React, { useEffect, useState } from 'react'
import "../styles/ResetPassword.scss"
import { Form } from 'reactstrap'
import reset1 from "../assets/login/reset1.png"
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import axios from 'axios';
import { BASE_URL } from '../utilis/config';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const handleSubmit = async () => {
        const loadingToast = toast.loading('Verifying OTP...');
        try {
            const res = await axios.get(`${BASE_URL}/verifyOTP`, { params:{otp: otp }});
            if (res?.status === 200) {
                toast.success(res?.data?.message, { id: loadingToast });
                navigate("/set-password");
            }
            else {
                toast.error("OTP not Verified!!", { id: loadingToast });
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.message, { id: loadingToast });
        }
    }
    const formik = useFormik({
        initialValues: {
            otp: "",
        },
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
                            <span>Enter your received OTP to get back into your account.</span>
                        </div>

                        <Form onSubmit={formik.handleSubmit}>
                            <div className='resetPassword-input'>
                                <input {...formik.getFieldProps("otp")} type="text" id='otp' placeholder="OTP*" onChange={(e) => {
                                    formik.handleChange(e);
                                    setOtp(e.target.value);
                                }} />
                            </div>
                            <div className='resetPassword-input'>
                                <button type='submit'>Submit</button>
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
