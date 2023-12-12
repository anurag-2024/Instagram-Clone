import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: [],
    }
},
{timestamps: true},
);
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;