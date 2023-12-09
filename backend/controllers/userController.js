import User from '../models/User.model.js';

export const getUser = async (req, res) => {
    try{
        const user=await User.findOne({_id:req.params.id});
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
          res.status(200).json({
              success:true,
              message:"User found",
              data:user
          })
    }
    catch(err){
        console.error("Error during login:", err);
        res.status(400).json({ message: err.message });
    }
}