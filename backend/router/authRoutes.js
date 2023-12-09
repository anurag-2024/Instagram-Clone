import {Router} from "express";
import {register,login,localVariables,generateOTP,verifyEmail,verifyMobile,verifyOTP,resetPassword} from "../controllers/authController.js";
import sendMail from "../controllers/mailer.js";
const router=Router();

/** post routes */
router.post("/register",register);
router.post("/login",login);
router.post("/registerMail",verifyEmail,sendMail);
router.post("/verifyMobile",verifyMobile);
/**get routes */
router.get("/generateOTP",localVariables,generateOTP);
router.get("/verifyOTP",verifyOTP);

/**put routes */
router.put("/resetPassword",resetPassword)
export default router;