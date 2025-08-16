const mongoose =require('mongoose');
const settingSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    url:{
        type:String
    }



},{timestamps:true})
module.exports=mongoose.model("Settings",settingSchema);