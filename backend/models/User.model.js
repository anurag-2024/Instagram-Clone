import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    fullName:{
        type:String,
        required:[true,"Full Name is required"]
    },
    email: {
      type: String,
      unique: true,
    },
    mobile:{
        type: String,
        unique: true,
        sparse: true,
        default: undefined,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profile: {
      type: String,
    },
    bio:{
      type:String
    },
    gender:{
      type:String
    },
    post:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:"Post",
      default:[],
    },
    role: {
      type: String,
      default: "user",
    },
    notifications:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:"Notification",
      default:[],
    },
    followers:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:"User",
      default:[],
    },
    following:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:"User",
      default:[],
    }
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
