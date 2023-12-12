import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image:{
        type:String,
        required:true,
    },
    likes: {
        type: Array,
        default: [],
    }
},
{timestamps: true},
);
const Story = mongoose.model("Story", storySchema);
export default Story;