const Message=require('../models/messages');
const mongoose=require('mongoose');
const nodemailer=require('nodemailer');

const addNewMessage=async(req,res)=>{

    try {
        const messages=req.body;
        const createdMessage=await Message.create(messages);
        if(createdMessage){

        const transport=await nodemailer.createTransport({
        service:'gmail',
        auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
        }
        });

        const mailOptions={
        from:createdMessage.from,
        to:process.env.EMAIL_USER,
        subject:`Message from The client`,
        html:`<p>${createdMessage.from}</p><br><br>
        <p>${createdMessage.subject}</p>`

        }
        const mailBack={
            from:process.env.EMAIL_USER,
            to:createdMessage.from,
            subject:'Confirmation email',
            text:'Thank you for your message,we shall work on your request soon!'
        }
        await transport.sendMail(mailOptions);
        await transport.sendMail(mailBack);
            return res.status(201).json({
                success:true,
                message:'Message send successfully!',
                data:createdMessage
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

const viewAllMessages=async(req,res)=>{

    try {

         const messages=await Message.find({}).sort({createdAt:-1});
 if(messages.length>0){
     return res.status(200).json({
         success:true,
         message:'All messages fetched successfully!',
         data:messages
     })
 }else{
     return res.status(401).json({
         success:false,
         message:'No message available for now!'
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

const deleteMessage=async(req,res)=>{

    try {

        const message=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(message)){
        return res.status(400).json({
        success:false,
        message:'Invalid message id!'
        })
        };


        const ifMessage=await Message.findById(message);
        if(!ifMessage){
            return res.status(404).json({
                success:false,
                message:'Message with the id not found!!'
            })
        }
        const deletedMessage=await Message.findByIdAndDelete(message);
        return res.status(200).json({
            success:true,
            message:'Message deleted successfully!',
            data:deletedMessage
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
        
    }



}

const replyMessage=async(req,res)=>{
    try {

        const{to,reply,subjectback}=req.body
        const message=req.params.id;
        const exists=await Message.findById(message);
        if(!exists){
            return res.status(401).json({
                success:false,
                message:'Message with the id not found!!'
            })
        }
       const updated= await Message.findByIdAndUpdate(message,{to,reply,subjectback},{new:true});
       const transport=await nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
       });

       const mailOptions={
        from:process.env.EMAIL_USER,
        to:to,
        subject:'Reply Send',
        html:`<p>${reply}</p>`

       }
       await transport.sendMail(mailOptions);
        return res.status(200).json({
            success:true,
            message:'Reply send successfully!',
            updated
        })
        
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }



}

module.exports={addNewMessage,viewAllMessages,deleteMessage,replyMessage};