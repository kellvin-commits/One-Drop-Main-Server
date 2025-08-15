const mongoose=require('mongoose');

const galleryShema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    src:{
        type:String,
    },
    filename:{
        type:String,
    },
    description:{
        type:String
    }
});

module.exports=mongoose.model("Gallery",galleryShema);