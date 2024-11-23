import mongoose from "mongoose";

const NotificationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    type:{
        type:String,
        enum:["like","comment","follow"],
    },
    fromUser:{
        type:String,
    },
    message:{
        type:String,
    }
},{timestamps:true})

const Notification=mongoose.model("Notification",NotificationSchema);
export default Notification;
