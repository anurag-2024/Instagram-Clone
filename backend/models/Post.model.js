import mongoose from "mongoose";

const PostSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    image:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
        required:true,
    },
    likes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
        default:[],
    },
    comments:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Comment",
        default:[],
    }
},
{timestamps:true},
);
const Post=mongoose.model("Post",PostSchema);
export default Post;