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
        type:String,
        unique:true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profile: {
      type: String,
    },
    bio:{type:String},
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
