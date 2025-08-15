const User=require("../models/user-model");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');



const registerUser=async(req,res)=>{

try {
    const {username,email,password}=req.body;
    if(!username ||!email ||!password){
        return res.status(400).json({
            success:false,
            message:'All fields are required!!'
        });
    }
    const existingUser=await User.findOne({$or:[{username},{email}]});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:'User already existing,please try with a different username or email!'
        })
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const user=new User({
        username,
        email,
        password:hashedPassword
    })
    await user.save();
    return res.status(201).json({
        success:true,
        message:'Registered successfully!'
    });
    
} catch (error) {
    console.error(error);
    return res.status(500).json({
        success:false,
        message:error.message
    })
    
}

}

//login controller
const loginUser=async(req,res)=>{
    try {
        const {username,password}=req.body;
        if(!username ||!password){
            return res.status(400).json({
                success:false,
                message:'All the fields are required!'
            })
        }
        const user=await User.findOne({username});
        if(!user){
            return res.status(401).json({
                success:false,
                message:'Please enter a valid username!'
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:'Please enter a valid password!'
            })
        }
        const token=jwt.sign({userId:user._id,userName:user.username},process.env.JWT_SECRET,{expiresIn:'7d'});
        return res.status(200).json({
            success:true,
            message:'Login successfully!',
            token
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }


}

module.exports={registerUser,loginUser}