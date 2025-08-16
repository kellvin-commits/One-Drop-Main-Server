const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'

    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);