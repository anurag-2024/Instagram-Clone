import React, { useState } from 'react'
import "../styles/ResetPassword.scss"
import { Form } from 'reactstrap'
import reset1 from "../assets/login/reset1.png"
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../Store/slices/authSlice'

const SetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, resetEmail, resetMobile } = useSelector(state => state.auth);
    const [password, setPassword] = useState("");
    const [againpassword, setAgainPassword] = useState("");

    const validatePassword = (password) => {
        const specialChar = /[!@#\$%^&*()_+{}\[\]:;<>,.?~\\-]/;
        
        if (!password || !againpassword) {
            throw new Error("Password is required");
        }
        if (password !== againpassword) {
            throw new Error("Passwords do not match");
        }
        if (password.includes(" ")) {
            throw new Error("Password can't contain spaces");
        }
        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        }
        if (!specialChar.test(password)) {
            throw new Error("Password must contain at least one special character");
        }
    };

    const handleSubmit = async () => {
        const loadingToast = toast.loading('Resetting Password...');
        try {
            validatePassword(password);
            
            const emailormobile = resetEmail || resetMobile;
            await dispatch(resetPassword({ 
                password, 
                email: resetEmail, 
                mobile: resetMobile 
            })).unwrap();
            
            toast.success("Password reset successfully!", { id: loadingToast });
            navigate("/login");
        } catch (err) {
            toast.error(err.message || "Failed to reset password", { id: loadingToast });
        }
    }

    const formik = useFormik({
        initialValues: {
            password: "",
            againpassword: ""
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: handleSubmit,
    });

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
                            <span>Create A Strong Password</span>
                        </div>
                        <div className='resetPassword-text'>
                            <span>Your password must be at least 6 characters and should include a combination of numbers, letters and special characters (!$@%)</span>
                        </div>
                        <Form onSubmit={formik.handleSubmit}>
                            <div className='resetPassword-input'>
                                <input 
                                    {...formik.getFieldProps('password')} 
                                    type="password" 
                                    id='password' 
                                    placeholder="New password" 
                                    disabled={loading}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setPassword(e.target.value);
                                    }} 
                                />
                            </div>
                            <div className='resetPassword-input'>
                                <input 
                                    {...formik.getFieldProps('againpassword')} 
                                    type="password" 
                                    id='againpassword' 
                                    placeholder="New password, again" 
                                    disabled={loading}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setAgainPassword(e.target.value);
                                    }} 
                                />
                            </div>
                            <div className='resetPassword-input'>
                                <button type='submit' disabled={loading}>
                                    {loading ? 'Resetting..' : 'Reset Password'}
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SetPassword
