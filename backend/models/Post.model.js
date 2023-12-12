import mongoose from "mongoose";

const PostSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    username:{
        type:String,
        required:true,
    },
    profile:{
        type:String,
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
        type:Array,
        default:[],
    },
    comments:{
        type:Array,
        default:[],
    }
},
{timestamps:true},
);
const Post=mongoose.model("Post",PostSchema);
export default Post;