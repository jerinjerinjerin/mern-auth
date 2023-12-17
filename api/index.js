import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routs.js';
import authRouter from './routes/auth.routs.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() =>{
    console.log('connect to MongoDB');
})
.catch((err) =>{
    console.log(err)
})


const app = express();
app.use(express.json());

app.listen(3000, () =>{
    console.log('server listensing on port 3000')
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
