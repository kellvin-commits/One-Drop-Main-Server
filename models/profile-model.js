const mongoose=require('mongoose');
const profileSchema=new mongoose.Schema({
    filename:String,
    src:String,
    title:String
},{timestamps:true});

module.exports=mongoose.model("Profile",profileSchema);