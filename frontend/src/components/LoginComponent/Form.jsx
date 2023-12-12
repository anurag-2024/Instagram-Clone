import React ,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { Container, Row, Col, Form, Button } from 'reactstrap'
import { BASE_URL } from '../../utilis/config';
import Cookies from 'js-cookie';
import toast, {Toaster} from "react-hot-toast";
import {loginValidation} from "../../helper/validate";
import {useFormik} from "formik";

const form = () => {
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading('Logging In...');
        try{
            let email,mobile,username;
            if(formik.values.emailorphoneorusername.includes("@")){
                email=formik.values.emailorphoneorusername;
            }
            else if(typeof(formik.values.emailorphoneorusername)!=="string"){
                mobile=formik.values.emailorphoneorusername;
            }
            else{
                username=formik.values.emailorphoneorusername;
            }
            const res=await axios.post(`${BASE_URL}/login`, { username:username, password:formik.values.password, email:email ,mobile:mobile });
            if(res?.status===200){
                console.log(res?.data);
                Cookies.set('token', res?.data?.token, { expires: 1 });
                toast.success("Logged In Successfully!",{id:loadingToast});
                navigate("/");
            }   
            else{
                toast.error("Login Failed!",{id:loadingToast});
            }
        }
        catch(err){
            console.error("Error during login:", err);
            toast.error(err?.response?.data?.message,{id:loadingToast});
            res.status(400).json({ message: err.message });
        }
    }
    const formik=useFormik({
        initialValues:{
            emailorphoneorusername:"",
            password:"",
        },
        validate:loginValidation,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit:handleSubmit,
    })
    return (
        <> 
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Form onSubmit={handleSubmit}>
                <div className='login__form-input'>
                    <input {...formik.getFieldProps('emailorphoneorusername')} id='emailorphoneorusername' placeholder='Phone number, username, or email' required />
                </div>
                <div className='login__form-input'>
                    <input {...formik.getFieldProps('password')} type='password' id='password' placeholder='Password' required />
                </div>
                <div className='login__form-input password'>
                    <Button type='submit'><span>Log in</span></Button>
                </div>
            </Form>
        </>
    )
}

export default form
