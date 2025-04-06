const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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



const login = async (req,res)=>{
    try{
      const {email, password} = req.body;
      const user = await UserModel.findOne({email});
      let errorMsg = 'Auth failed email or password is wrong';
      if(!user){
        return res.status(403).json({message: errorMsg, successs:false})
      }
      const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual){
        return res.status(403).json({message: errorMsg, successs:false})
      }
       const jwtToken = jwt.sign(
        {email:user.email, _id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    )
      res.status(200).json({message:"Login success", success:true, jwtToken, email, name:user.name})
      
    }
    catch (err){
        res.status(500).json({
            message:"internal server error",
            success:false
        })

    }
}

// controllers/authController.js

const logout = async (req, res) => {
  try {
    // Grab token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Optional: verify token to ensure it was valid
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }

      // You can invalidate token here if using Redis/etc (not required here)

      return res.status(200).json({
        success: true,
        message: 'Logout successful.',
      });
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Logout failed', error: err.message });
  }
};



module.exports={signup, login, logout}