import express from "express";
import { getNotifications } from "../controllers/notificationController.js";
import { verifyUser } from "../middleware/verify.js";

const router=express.Router();

router.get("/getNotifications",verifyUser,getNotifications);

export default router;