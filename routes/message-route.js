const express=require('express');
const{addNewMessage,deleteMessage,viewAllMessages,replyMessage}=require('../controllers/message-conroller');

const router=express.Router();

router.post('/add',addNewMessage)
router.get('/get',viewAllMessages)
router.delete('/delete/:id',deleteMessage)
router.put('/reply/:id',replyMessage)




module.exports=router;