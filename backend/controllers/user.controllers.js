import User from "../models/user.model.js";
export const getUserById = async (req,res)=>{
    try{
       const userId = req.userId;
       if(!userId){
               return res.status(400).json({
        success: false,
        message: "UserId does not found through token",
      });   
       }

      const user= await User.findById(userId);
       if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not found with these Id",
      });
    }

     return res.status(200).json({
      success: true,
      message: "user fetch successfully through the token",
      user,
    });


    }catch (error) {
    console.log("error during the user create is", error);
    res.status(500).json({
      success: false,
      message:"internal server error "
    });
  }
}
