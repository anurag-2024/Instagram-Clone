import { Router } from "express";
import { createPost } from "../controllers/postController.js";
import {verifyUser} from "../verifyToken/verify.js"
const router = Router();

/**post Routes */
router.post("/create",verifyUser, createPost);


export default router;