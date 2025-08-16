const Setting=require('../models/settings-model');

const updateSetting=async(req,res)=>{
    try {
        const updated=await Setting.findOneAndUpdate({},{...req.body,updatedAt:Date.now()},{new:true,upsert:true});
        return res.status(200).json({
            success:true,
            message:'Settings updated successfully!',
            data:updated
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }



}

const getSettings=async(req,res)=>{
    try {
        const settings=await Setting.findOne();
        if(settings){
            return res.status(200).json({
                success:true,
                data:settings
            })
        }else{
            return res.status(404).json({
                success:false,
                message:'No settings done yet!'
            })
        }
        
    } catch (error) {
        console.error(error);
        return  res.status(500).json({
            success:false,
            message:error.message
        })
        
    }



}

module.exports={updateSetting,getSettings};