const express=require('express');
const {addNewVideo,getAllVideos,UpdateVideo,deleteVideo}=require('../controllers/video-controller');
const multer=require('multer');
const path=require('path');
const router=express.Router();

const storage=multer.diskStorage({
        destination:(req,file,cb)=>cb(null,"uploads/"),
    filename:(req,file,cb)=>cb(null,Date.now() + path.extname(file.originalname))
});

const fileFilter=(req,file,cb)=>{
    const allowedFiles=['video/mp4','video/mov','video/x-msvideo'];
    if(allowedFiles.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new error ('Only allowed types should be included!'))
    }
}
const upload=multer({
    storage:storage,
    limits:{
        fileSize:100*1024*1024
    },
    fileFilter:fileFilter
});

router.post('/upload',upload.single("video"),addNewVideo);
router.get('/get',getAllVideos);
router.put('/update/:id',UpdateVideo)
router.delete('/delete/:id',deleteVideo)




module.exports=router