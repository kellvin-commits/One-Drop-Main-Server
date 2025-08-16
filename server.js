require('dotenv').config();
const express=require('express');
const cors=require('cors');
const path=require('path');
const connectToDb=require('./database/db');

const userRoute=require('./routes/user-route');
const galleryRoute=require('./routes/gallery-route');
const messageRoute=require('./routes/message-route');
const projectRoute=require('./routes/project-route');
const statRoute=require('./routes/stat-route');
const videoRoute=require('./routes/video-route');
const profileRoute=require('./routes/profile');
const settingRoute=require('./routes/settings-route');
const verifyUser=require('./routes/profile-me');

const app=express();
const PORT=process.env.PORT;
connectToDb();

app.use(cors({origin:"*"}));
app.use(express.json());
app.use('/uploads',express.static("uploads"));


app.use('/api/gallery',galleryRoute);
app.use('/api/auth',userRoute);
app.use('/api/message',messageRoute);
app.use('/api/project',projectRoute);
app.use('/api/stats',statRoute);
app.use('/api/video',videoRoute);
app.use('/api/profile',profileRoute);
app.use('/api/setting',settingRoute);
app.use('/api/dash',verifyUser);




app.listen(PORT,()=>{
    console.log(`Server is now listening at port ${PORT}`);
});



