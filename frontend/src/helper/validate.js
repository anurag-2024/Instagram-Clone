import toast from "react-hot-toast";
export async function resetValidation(values){
    const errors={};
    if(!values.emailormobile){
        errors.emailormobile=toast.error("Email or Mobile is required...");
    }
    else{
        const isEmail=values.emailormobile.includes("@");
        if(isEmail){
            emailValidate(errors,values);
        }
        else{
            const mobileRegex=/^[0-9]{10}$/;
            if(!mobileRegex.test(values.emailormobile)){
                errors.emailormobile=toast.error("Invalid mobile number...");
            }
        }
    }
}

export async function loginValidation(values){
    const errors={};
    passwordVerfiy(errors,values);
    if(!values.emailorphoneorusername){
        errors.emailorphoneorusername=toast.error("Email or Mobile or Username is required...");
    }else{
        const isEmail=values.emailorphoneorusername.includes("@");
        if(isEmail){
            emailValidate(errors,values);
        }else if(typeof(values.emailorphoneorusername)==="number"){
            const mobileRegex=/^[0-9]{10}$/;
            if(!mobileRegex.test(values.emailorphoneorusername)){
                errors.emailorphoneorusername=toast.error("Invalid mobile number...");
            }
        }
        else{
            usernameVerfiy(errors,values);
        }
    }
}


export async function registerValidation(values){
    const errors={};
    usernameVerfiy(errors,values);
    passwordVerfiy(errors,values);
    if (!values.emailormobile) {
        errors.emailormobile = toast.error("Email or Mobile is required...");
    } else {
        const isEmail = values.emailormobile.includes("@");
        if (isEmail) {
            emailValidate(errors, values);
        } else {
            const mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(values.emailormobile)) {
                errors.emailormobile = toast.error("Invalid mobile number...");
            }
        }
    }
    console.log("errors",errors);
    return errors;
}
function passwordVerfiy(error={},values){
    const specialChar = /[!@#\$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    if(!values.password){
        error.password=toast.error("Password is required...");
    }
    else if(values.password.includes(" ")){
        error.password=toast.error("Password can't contain spaces...");
    }
    else if(values.password.length<4){
        error.password=toast.error("Password must be at least 4 characters long...");
    }
    else if(!specialChar.test(values.password)){
        error.password=toast.error("Password must contain at least one special character...");
    }
    return error;
}

function usernameVerfiy(error={},values){
    console.log("username",values.username);
    if(!values.username){
        error.username=toast.error("Username is required...");
    }
    else if(values.username.includes(" ")){
        error.username=toast.error("Username can't contain spaces...");
    }
    else if (values.username.includes("@")) {
        error.username = toast.error("Username cannot contain '@' symbol...");
    }
    return error;
}
function emailValidate(error={},values){
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailormobile)){
        error.email=toast.error("Invalid email address...");
    }
    
    return error;
}