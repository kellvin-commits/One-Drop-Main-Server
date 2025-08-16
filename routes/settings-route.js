const express=require('express');
const{updateSetting,getSettings}=require('../controllers/setting-controller');
const router=express.Router();
router.put('/update',updateSetting);
router.get('/get',getSettings);

module.exports=router;