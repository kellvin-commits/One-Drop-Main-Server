const mongoose=require('mongoose');
const videoSchema=new mongoose.Schema({
    filename:{
        type:String
    },
    src:{
        type:String
    },
    title:{
        type:String,
        
    },
   description:{
        type:String,
        

    }

});
module.exports=mongoose.model("Video",videoSchema);
