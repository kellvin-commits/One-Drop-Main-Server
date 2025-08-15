const mongoose=require('mongoose');
const messageSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    to:{
        type:String,
        default:''
    },
    reply:{
        type:String,
        default:''
    },
    subjectback:{
        type:String,
        default:''
    }

})

module.exports=mongoose.model("Message",messageSchema);