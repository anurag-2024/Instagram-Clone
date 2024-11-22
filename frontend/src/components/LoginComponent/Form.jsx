import React from 'react'
import {useNavigate} from "react-router-dom"
import { Form, Button } from 'reactstrap'
import Cookies from 'js-cookie';
import toast, {Toaster} from "react-hot-toast";
import {loginValidation} from "../../helper/validate";
import {useFormik} from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Store/slices/authSlice';

const form = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state?.auth || {});
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
            const result = await dispatch(loginUser({ 
                username, 
                email, 
                mobile, 
                password: formik.values.password 
            })).unwrap();
            console.log(result);
            Cookies.set('token', result.token, { expires: 1 });
            toast.success("Logged In Successfully!", {id: loadingToast});
            navigate("/");
        }
        catch(err){
            console.error("Error during login:", err);
            toast.error(err?.message || "Login Failed!", {id: loadingToast});
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
