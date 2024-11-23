import React from 'react'
import "../styles/ResetPassword.scss"
import { Form } from 'reactstrap'
import reset1 from "../assets/login/reset1.png"
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import { resetValidation } from "../helper/validate";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { generateOTP, sendOTPEmail, verifyMobile, setResetEmail, setResetMobile } from '../Store/slices/authSlice';

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

    const handleSubmit = async () => {
        const loadingToast = toast.loading('Sending OTP...');
        try {
            const otpResult = await dispatch(generateOTP()).unwrap();
            const value = otpResult.code;
            
            const emailormobile = formik.values.emailormobile;
            
            if (emailormobile.includes("@")) {
                dispatch(setResetEmail({ email: emailormobile }));
                await dispatch(sendOTPEmail({ 
                    email: emailormobile, 
                    otp: value 
                })).unwrap();
                
                toast.success("OTP Sent Successfully!", { id: loadingToast });
                navigate("/otp");
            } else {
                dispatch(setResetMobile({ mobile: emailormobile }));
                await dispatch(verifyMobile({ 
                    mobile: emailormobile, 
                    otp: value 
                })).unwrap();
                
                toast.success("OTP Sent Successfully!", { id: loadingToast });
                navigate("/otp");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Failed to send OTP", { id: loadingToast });
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
    });

    return (
        <>
            <div className='resetPassword'>
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
                                <input 
                                    {...formik.getFieldProps("emailormobile")} 
                                    type="text" 
                                    id='emailormobile' 
                                    placeholder="Email" 
                                    disabled={loading}
                                />
                            </div>
                            <div className='resetPassword-input'>
                                <button type='submit' disabled={loading}>
                                    {loading ? 'Sending...' : 'Send OTP'}
                                </button>
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
                            <span onClick={() => navigate("/login-redirected")}>Back to Login</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
