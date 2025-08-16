const Project=require('../models/project-model');
const path=require('path');
const fs=require('fs');


const addNewProject=async(req,res)=>{

    try {
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:'Please upload a file!!'
            })
        }

    
    const newProject=new Project({
        name:req.body.name,
        desc:req.body.desc,
        filename:req.file.filename,
        src:`/uploads/${req.file.filename}`,
        status:req.body.status

    })
    await newProject.save();
    return res.status(201).json({
        success:true,
        message:"Project added successfully!",
        data:newProject
    })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
            
        })
        
    }


}

const viewAllProject=async(req,res)=>{
try {
const projects=await Project.find({}).sort({createdAt:-1});
if(projects.length>0){
return res.status(200).json({
success:true,
message:'all fetched successfully!',
data:projects
})
}else{
return res.status(404).json({
success:false,
message:'No projects available for now!'})}
    
} catch (error) {
console.error(error);
return res.status(500).json({
success:false,
message:error.message
})
    
}
}

const deleteProject=async(req,res)=>{

    try {

          const project=req.params.id;
  const existPro=await Project.findById(project);
  if(!existPro){
      return res.status(404).json({
          success:false,
          message:'No project with the id found!!'
      })
  }

  const filePath=path.join(__dirname,"uploads",existPro.filename.trim());
  if(fs.existsSync(filePath)){
    fs.unlinkSync(filePath);
  }
  const deletedPro=await Project.findByIdAndDelete(project);
  return res.status(200).json({
      success:true,
      message:'Project deleted successfully!',
      data:deletedPro
  })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
  
  
  
  
  
  


}


const updateProject=async(req,res)=>{
    try {
        const project=req.params.id;
        const existPro=await Project.findById(project);
        if(!existPro){
            return res.status(401).json({
                success:false,
                message:'No project with the id found!!'
            })
        }
        const updatedpro=await Project.findByIdAndUpdate(project,req.body,{new:true});
        return res.status(200).json({
            success:true,
            message:'Project details updated successfully!!',
            data:updatedpro
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
    addNewProject,viewAllProject,updateProject,deleteProject
}