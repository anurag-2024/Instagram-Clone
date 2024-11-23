import { Router } from "express";
import { createPost, getAllPosts, getPostById, likePost, unlikePost, commentPost, deleteComment, deletePost, getPostsByUserId, likedPosts } from "../controllers/postController.js";
import {verifyUser} from "../middleware/verify.js"
const router = Router();

/**post Routes */
router.post("/create",verifyUser, createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getPost/:id", getPostById);
router.post("/likePost/:id", verifyUser, likePost);
router.post("/unlikePost/:id", verifyUser, unlikePost);
router.post("/commentPost/:id", verifyUser, commentPost);
router.post("/deleteComment/:id/:commentId", verifyUser, deleteComment);
router.delete("/deletePost/:id", verifyUser, deletePost);
router.get("/likedPosts", verifyUser, likedPosts);


export default router;