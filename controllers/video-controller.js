const Video=require('../models/video-model');
const path=require('path');
const fs=require('fs');

const addNewVideo=async(req,res)=>{
    try {
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:'Please upload a file'
            })
        }

        const newVideo= new Video({
            filename:req.file.filename,
            src:`/uploads/${req.file.filename}`,
            title:req.body.title,
            description:req.body.description
        });
        await newVideo.save();
        return res.status(201).json({
            success:true,
            message:'Video uploaded successfully!!'
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }



}

const getAllVideos=async(req,res)=>{
    try {
        const videos=await Video.find({});
        if(videos.length>0){
            return res.status(200).json({
                success:true,
                message:'Videos fetched successfully!',
                data:videos
            })
        }else{
            return res.status(404).json({
                success:false,
                message:'No videos available for now'
            });
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }


}

const UpdateVideo=async(req,res)=>{
    try {
         const videoId=req.params.id;
 const ifExist=await Video.findById(videoId);
 if(!ifExist){
     return res.status(404).json({
         success:false,
         message:'Video with the id not found!!'
     })
 }
 const updatedVideo=await Video.findByIdAndUpdate(videoId,req.body,{new:true});
 return res.status(200).json({
    success:true,
    message:'Video updated successfully!',
    data:updatedVideo
 })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }


}

const deleteVideo=async(req,res)=>{
    try {
        const videoId=req.params.id;
        const ifVideo=await Video.findById(videoId);
        if(!ifVideo){
            return res.status(404).json({
                success:false,
                message:'Video with the id not found!!'
            })
        }

        const filePath=path.join(__dirname,'uploads',ifVideo.src.trim());
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
        }
        await Video.findByIdAndDelete(videoId);
        return res.status(200).json({
            success:true,
            message:'Video deleted successfully!'
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }



}

module.exports={
    addNewVideo,getAllVideos,UpdateVideo,deleteVideo
}