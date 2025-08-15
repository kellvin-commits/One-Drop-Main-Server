const express=require('express');
const { addNewProject, viewAllProject, updateProject, deleteProject }=require('../controllers/project-controller');

const router=express.Router();

router.post('/add',addNewProject)
router.get('/get',viewAllProject)
router.put('/update/:id',updateProject)
router.delete('/delete/:id',deleteProject)



module.exports=router;