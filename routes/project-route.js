const express=require('express');
const { addNewProject, viewAllProject, updateProject, deleteProject }=require('../controllers/project-controller');
const multer=require('multer');
const path=require('path');
const router=express.Router();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads/"),
    filename:(req,file,cb)=>cb(null,Date.now() + path.extname(file.originalname))
});
const upload=multer({storage});

router.post('/add',upload.single("image"),addNewProject);
router.get('/get',viewAllProject);
router.put('/update/:id',updateProject);
router.delete('/delete/:id',deleteProject);



module.exports=router;