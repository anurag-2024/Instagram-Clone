import React ,{useState} from 'react'
import "../styles/ResetPassword.scss"
import { Form } from 'reactstrap'
import reset1 from "../assets/login/reset1.png"
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { BASE_URL } from '../utilis/config';
import { useSelector } from 'react-redux'
const SetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [againpassword, setAgainPassword] = useState("");
    const email = useSelector((state) => state.email);
    const mobile = useSelector((state) => state.mobile);
    const handleSubmit = async () => {
        const loadingToast = toast.loading('Resetting Password...');
        try {
            const specialChar = /[!@#\$%^&*()_+{}\[\]:;<>,.?~\\-]/;
            if (password !== againpassword) {
                toast.error("Password not matched..." , { id: loadingToast });
            }
            else if (password.includes(" ")) {
                toast.error("Password can't contain spaces..." , { id: loadingToast });
            }
            else if (password.length < 6) {
                toast.error("Password must be at least 6 characters long..." , { id: loadingToast });
            }
            else if (!password || !againpassword) {
                toast.error("Password is required..." , { id: loadingToast });
            }
            else if(!specialChar.test(password)){
                toast.error("Password must contain at least one special character..." , { id: loadingToast });
            }
            else {
                try{
                    const emailormobile = email ? email : mobile;
                    const res = await axios.put(`${BASE_URL}/resetPassword`, { password: password ,email:emailormobile,mobile:emailormobile});
                    if (res?.status === 200) {
                        toast.success(res?.data?.message, { id: loadingToast });
                        navigate("/login");
                    }
                }
                catch(err){
                    toast.error(err?.response?.data?.message, { id: loadingToast });
                }
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.message, { id: loadingToast });
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
                            <span>Create A Strong Password</span>
                        </div>
                        <div className='resetPassword-text'>
                            <span>Your password must be atleast 6 characters and should include a combination of number,letters and special characters (!$@%)</span>
                        </div>
                        <Form onSubmit={formik.handleSubmit}>
                            <div className='resetPassword-input'>
                                <input {...formik.getFieldProps('password')} type="password" id='password' placeholder="New password" onChange={(e) => {
                                    formik.handleChange(e);
                                    setPassword(e.target.value);
                                    console.log(password);
                                }} />
                            </div>
                            <div className='resetPassword-input'>
                                <input {...formik.getFieldProps('againpassword')} type="password" id='againpassword' placeholder="New password, again" onChange={(e) => {
                                    formik.handleChange(e);
                                    setAgainPassword(e.target.value);
                                    console.log(againpassword);
                                }} />
                            </div>
                            <div className='resetPassword-input'>
                                <button type='submit'>ResetPassword</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SetPassword
