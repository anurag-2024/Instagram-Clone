import Post from '../models/Post.model.js';
import User from '../models/User.model.js';

export const createPost = async (req, res) => {
    try {
        await Post.create(req.body)
            .then(async (post) => {
                if (!post) {
                    return res.status(404).json({
                        success: false,
                        message: "Post not found"
                    });
                }
                await User.findByIdAndUpdate(req.body.userId, { $push: { post:post._id } }, { new: true })
                    .then((user) => {
                        if (!user) {
                            return res.status(404).json({
                                success: false,
                                message: "User not found"
                            });
                        }
                        res.status(200).json({
                            success: true,
                            post: post,
                            user: user
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });

    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}