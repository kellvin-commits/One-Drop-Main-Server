const Project=require('../models/project-model');


const addNewProject=async(req,res)=>{

    try {

    const project=req.body;
    if(!project){
        return res.status(400).json({
            success:false,
            message:'All fields should be filled!'
        })
    }
    const newProject=await Project.create(project);
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