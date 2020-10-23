import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import LoginRouter from './controllers/LoginController.js';
import UserRouter from './controllers/UserController.js';
import RKHRouter from './controllers/RKHController.js'
import QCRouter from './controllers/QualityCheckController.js'
import Authorization from './controllers/AuthController.js';

const app = express();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });

        console.log('Connect to DB Success');
    } catch (err) {
        console.log(err);
    }
}

connectDB();

app.use(morgan('dev'));

app.use('/api/login', LoginRouter);
app.use('/api/users', Authorization, UserRouter);
app.use('/api/rkh', Authorization, RKHRouter);
app.use('/api/qc', Authorization, QCRouter);

app.listen(process.env.PORT, () => {
    console.log('App Listen to Port 3000');
});