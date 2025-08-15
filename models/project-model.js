const mongoose=require('mongoose');
const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:String
    },
date:{
    type:Date,
    default:Date.now
}
});

module.exports=mongoose.model("Project",projectSchema);