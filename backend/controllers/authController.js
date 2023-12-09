import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

export const verifyEmail = (req, res, next) => {
    try {
        const email = decodeURIComponent(req.body.email);
        User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    return res.status(400).json({
                        success: false,
                        message: "Email not found"
                    })
                }
                next();
            })
    }
    catch (err) {
        console.error("Error during email verification:", err);
        res.status(400).json({ message: err.message });
    }
}
export const verifyMobile = (req, res) => {
    try {
        const mobile = req.body.mobile;
        User.findOne({ mobile: mobile })
            .then((user) => {
                if (!user) {
                    return res.status(400).json({
                        success: false,
                        message: "Mobile Number not found"
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Mobile found"
                })
            })
    }
    catch (err) {
        console.error("Error during mobile verification:", err);
        res.status(400).json({ message: err.message });
    }
}
export const register = async (req, res) => {
    try {
        User.findOne({ username: req.body.username})
            .then(async (user) => {
                if (!user) {
                    const password = await bcryptjs.hash(req.body.password, 10);
                    const newUser = new User({
                        username: req.body.username,
                        fullName: req.body.fullName,
                        email: req.body.email,
                        mobile: req.body.mobile,
                        password: password
                    });
                    const user = await newUser.save();
                    return res.status(201).json({
                        success: true,
                        message: "User created successfully",
                        data: user
                    })
                }
                if (user) {
                    return res.status(401).json({
                        success: false,
                        message: "Username already exists"
                    })
                }
            })

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(400).json({ message: "Some error occurred" });
    }
}
export const login = async (req, res) => {
    try {
        const user = req.body.username || req.body.email || req.body.mobile.toString();
        User.findOne({ $or: [{ username: user }, { email: user }, { mobile: user }] })
            .then((user) => {
                if (!user) {
                    return res.status(400).json({
                        success: false,
                        message: "User not found"
                    })
                }
                bcryptjs.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            return res.status(400).json({
                                success: false,
                                message: "Invalid credentials"
                            })
                        }
                        const { password, role, ...others } = user._doc;
                        const token = jwt.sign({
                            userId: user._id,
                            email: user.email,
                            role: user.role
                        }, process.env.JWT_SECRET, { expiresIn: "1d" });
                        return res.status(200).json({
                            success: true,
                            message: "Logged in successfully",
                            data: others,
                            token: token
                        })
                    })
                    .catch((err) => {
                        console.error("Error during login:", err.message);
                        res.status(400).json({ message: err.message });
                    })
            })
            .catch((err) => {
                console.error("Error during login:", err);
                res.status(400).json({ message: err.message });
            })
    }
    catch (err) {
        console.error("Error during login:", err);
        res.status(400).json({ message: err.message });
    }
}

export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}

export async function generateOTP(req, res) {
    req.app.locals.OTP = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false });
    res.status(201).send({ code: req.app.locals.OTP });
}

export async function verifyOTP(req, res) {
    try{
        const otp = req.query.otp;
        if(parseInt(otp) === parseInt(req.app.locals.OTP)){
            res.app.locals.resetSession = true;
            res.app.locals.OTP = null;
            res.status(200).json({ message: "OTP verified" });
        }
        else{
            res.status(400).json({ message: "Invalid OTP" });
        }
    }
    catch(err){
        console.error("Error during OTP verification:", err);
        res.status(400).json({ message: "Error during OTP verification" });
    }
}

export async function resetPassword(req, res) {
    try{
        if(!req.app.locals.resetSession) return res.status(400).send({error:"Session expired"});
        const {email,mobile,password} = req.body;
        try{
            const user = await User.findOne({ $or: [{ email: email }, { mobile: mobile.toString() }] });
            if(!user) return res.status(400).send({error:"User not found"});
            const newPassword = await bcryptjs.hash(password, 10);
            await User.findByIdAndUpdate(user._id, {password: newPassword}, {new: true})
            .then((updatedUser) => {
                if(!updatedUser) return res.status(400).send({error:"User not found"});
                req.app.locals.resetSession=false;
                return res.status(200).json({ message: "Password reset successfully" , data: updatedUser});
            })
            .catch((err) => {
                console.error("Error during password reset:", err);
                res.status(500).json({ message: "Some error occcured" });
            });
        }
        catch(err){
            console.error("Error during password reset:", err);
            res.status(500).json({ message: "Some error occcured" });
        }
    }
    catch(err){
        console.error("Error during password reset:", err);
        res.status(500).json({ message: "Some error occcured" });
    }
}