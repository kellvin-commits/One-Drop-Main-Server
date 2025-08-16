const verifyUser=require('../middlewares/midlleware');
const express=require('express');
const router=express.Router();

router.get('/get',verifyUser,(req,res)=>{
    try {
        return res.status(200).json({
           data:req.user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

})

module.exports=router;