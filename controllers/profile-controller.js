const Profile=require('../models/profile-model');
const path=require('path');
const fs=require('fs');

const addNeWProfile=async(req,res)=>{
    try {
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:'Please upload a file!!'
            })
        }
        const newProfile=new Profile({
            filename:req.file.filename,
            src:`/uploads/${req.file.filename}`,
            title:req.body.title
        });
        await newProfile.save();
        return res.status(201).json({
            success:true,
            message:'Profile Updated successfully!'
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

const getProfile=async(req,res)=>{
    try {
        const profilePhotos=await Profile.find({}).sort({createdAt:-1});
        if(profilePhotos.length>0){
            return res.status(200).json({
                success:true,
                data:profilePhotos
            })
        }else{
            return res.status(404).json({
                success:false,
                message:'No profile photos for now!'
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


const deleteProfilePhoto=async(req,res)=>{
    try {

        const profileId=req.params.id;
        const ifProfileId=await Profile.findById(profileId);
        if(!ifProfileId){
            return res.status(404).json({
                success:false,
                message:'No profile photo with the id found!!'
            })
        }

        const profilePath=path.join(__dirname,"uploads",ifProfileId.filename);
        if(fs.existsSync(profilePath)){
            fs.unlinkSync(profilePath)
            
        };

        const deleted=await Profile.findByIdAndDelete(profileId);
        return res.status(200).json({
            success:true,
            message:'Profile image deleted successfully!',
            data:deleted
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
    addNeWProfile,getProfile,deleteProfilePhoto
}