import Post from '../models/Post.model.js';
import cloudinary from '../utils/cloudinary.js';
import Comment from '../models/Comment.model.js';
import User from '../models/User.model.js';
import Notification from '../models/Notification.model.js';

export const createPost = async (req, res) => {
    try {
        let imageUrl = null;
        if (req.body.image) {
            try {
                const result = await cloudinary.uploadImage(req.body.image);
                imageUrl = result.url;
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Error uploading image",
                    error: error.message
                });
            }
        }

        const newPost = await Post.create({
            ...req.body,
            image: imageUrl
        });
        await User.findByIdAndUpdate(req.user.userId, { $push: { posts: newPost._id } });
        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: newPost
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating post",
            error: error.message
        });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Validate limit to prevent excessive data fetching
        if (limit > 50) {
            return res.status(400).json({
                success: false,
                message: "Limit cannot exceed 50 posts per page"
            });
        }

        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await Post.find()
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: "userId",
                select: "fullName profile _id username"
            })
            .populate({
                path: "comments",
                populate: {
                    path: "userId",
                    select: "fullName profile _id username"
                }
            })
            .lean();

        res.status(200).json({
            success: true,
            posts,
            pagination: {
                currentPage: page,
                postsPerPage: limit,
                totalPages,
                totalPosts,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (err) {
        console.log('Error in getAllPosts:', err);
        res.status(400).json({ success: false, message: err.message });
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate({
                path: "userId",
                select: "fullName profile _id username"
            })
            .populate({
                path: "comments",
                populate: {
                    path: "userId",
                    select: "fullName profile _id username"
                }
            })
            .lean();
        console.log(post);
        res.status(200).json({ post });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('userId');
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            { $push: { likes: req.user.userId } }, 
            { new: true }
        );

        const notification = await Notification.create({
            userId: post.userId._id,
            type: "like",
            fromUser: req.user.username,
            message: "liked your post"
        });

        // Get socket ID from connected users map
        const socketId = global.connectedUsers.get(post.userId._id.toString());
        if (socketId) {
            global.io.to(socketId).emit("newNotification", notification);
        }

        res.status(200).json({ success: true, post: updatedPost });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

export const unlikePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user.userId } }, { new: true });
        res.status(200).json({ post });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

export const commentPost = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.user);
        const newComment = await Comment.create({
            ...req.body,
            userId: req.user.userId,
            postId: req.params.id,
        });
        const post = await Post.findByIdAndUpdate(
            req.params.id, 
            { $push: { comments: newComment._id } }, 
            { new: true }
        ).populate({
            path: "comments",
            populate: {
                path: "userId",
                select: "fullName profile _id"
            }
        });
        const notification = await Notification.create({
            userId: post.userId,
            type: "comment",
            fromUser: req.user.username,
            message: `commented on your post ${req.body.comment}`
        });

        // Get socket ID from connected users map
        const socketId = global.connectedUsers.get(post.userId.toString());
        if (socketId) {
            global.io.to(socketId).emit("newNotification", notification);
        }

        await User.findByIdAndUpdate(req.user.userId, { $push: { notifications: notification._id } });
        res.status(200).json({ success: true, post });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: err.message });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        const post = await Post.findByIdAndUpdate(req.params.id, { $pull: { comments: req.params.commentId } }, { new: true });
        res.status(200).json({ post });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ post });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

export const getPostsByUserId = async (req, res) => {
    try {
        console.log(req.params.id);
        const posts = await Post.find({ userId: req.params.id })
            .populate({
                path: "userId",
                select: "fullName profile _id username"
            })
            .populate({
                path: "comments",
                populate: {
                    path: "userId",
                    select: "fullName profile _id username"
                }
            })
        res.status(200).json({ posts });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

export const likedPosts = async (req, res) => {
    try {
        const posts = await Post.find({ likes: req.user.userId });
        res.status(200).json({ posts });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}
