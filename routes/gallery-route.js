const express=require('express');
const{addNewImage,viewAllImage,updateImage,deleteImage}=require('../controllers/gallery-controller');
const path=require('path');
const multer=require('multer');

const router=express.Router();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads/"),
    filename:(req,file,cb)=>cb(null,Date.now() + path.extname(file.originalname))
})
const upload=multer({storage});

router.post('/add',upload.single("image"),addNewImage);
router.get('/get',viewAllImage)
router.put('/update/:id',updateImage)
router.delete('/delete/:id',deleteImage)


module.exports=router;

