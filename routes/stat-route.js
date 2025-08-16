const express=require('express');
const Messages=require('../models/messages');
const Galleries=require('../models/gallery-model');
const Projects=require('../models/project-model');
const Videos=require('../models/video-model');

const router=express.Router();
router.get('/get',async(req,res)=>{
    try {

        const messages= await Messages.countDocuments();
        const images=await Galleries.countDocuments();
        const projects=await Projects.countDocuments();
        const videos=await Videos.countDocuments();

        return res.status(200).json({
            success:true,
            message:messages,
            image:images,
            project:projects,
            video:videos
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
})





module.exports=router;








