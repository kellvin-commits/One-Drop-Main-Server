const path=require('path');
const{ addNeWProfile, getProfile, deleteProfilePhoto }=require('../controllers/profile-controller');
const express=require('express');
const multer=require('multer');
const router=express.Router();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads/"),
    filename:(req,file,cb)=>cb(null,Date.now() + path.extname(file.originalname))
});

const upload=multer({storage});


router.post('/upload',upload.single("image"),addNeWProfile)
router.get('/get',getProfile)
router.delete('/delete/:id',deleteProfilePhoto)


module.exports=router;