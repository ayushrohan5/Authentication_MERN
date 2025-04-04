const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');

const signup = async (req,res)=>{
    try{
      const {name, email, password} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        return res.status(409).json({message: "user already exist, you can login", successs:false})
      }
      const userModel = new UserModel({name, email, password})
      userModel.password = await bcrypt.hash(password, 10);
      await userModel.save();
      res.status(201).json({message:"signup successfully", success:true})
      
    }
    catch (err){
        res.status(500).json({
            message:"internal server error",
            success:false
        })

    }
}

module.exports={signup}