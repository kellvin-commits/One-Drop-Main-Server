const Gallery=require('../models/gallery-model');
const path=require('path');
const fs=require('fs');

const addNewImage=async(req,res)=>{
    try {
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:'Please upload an a file'
            })
        }
        const image=new Gallery({
            src:`/uploads/${req.file.filename}`,
            filename:req.file.filename,
            title:req.body.title,
            description:req.body.description
        });
        await image.save();
        return res.status(201).json({
            success:true,
            message:'Image uploaded successfully!'
        })
        
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }


}

const viewAllImage=async(req,res)=>{
    try {
        const images=await Gallery.find({}).sort({createdAt:-1});
        if(images.length>0){
            return res.status(200).json({
                success:true,
                message:'All images fetched successfully!',
                data:images
            })
        }else{
            return res.status(404).json({
                success:false,
                message:'No images found yet!'
            })
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

}

const updateImage=async(req,res)=>{
    try {
        const imageId=req.params.id;
        const exists=await Gallery.findById(imageId);
        if(!exists){
            return res.status(404).json({
                success:false,
                message:'Image with the id not found!'
            })
        }
         const updatedImage=await Gallery.findByIdAndUpdate(imageId,req.body,{new:true});
        return res.status(200).json({
            success:true,
            message:'Updated successfully!',
            data:updateImage
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }


}

const deleteImage=async(req,res)=>{

    try {
        const image=req.params.id;
        const exists=await Gallery.findById(image);
        if(!exists){
            return res.status(404).json({
                success:false,
                message:'image with the id not found!'
            })
        }
       
       const imageFile = path.join(__dirname,"../uploads",exists.src.trim());

        if(fs.existsSync(imageFile)){
            fs.unlinkSync(imageFile);
        }
        await Gallery.findByIdAndDelete(image);
        return res.status(200).json({
            success:true,
            message:'Image deleted'
        })
        
    } catch (error) {

        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }


}

module.exports={addNewImage,deleteImage,viewAllImage,updateImage};