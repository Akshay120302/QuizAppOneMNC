import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';


dotenv.config();

// const cors = require('cors');
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("Connected to database");
})
.catch((err) => {
    console.log(err);
});

const _dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3001, () => {
    console.log("Server is up and running at 3001");
});

app.use(cors({
  origin: 'http://localhost:5173', // Update with your client's origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use("/API/user/" , userRouter);
app.use("/API/auth/" , authRouter);
app.use('/API/listing', listingRouter);

app.use(express.static(path.join(_dirname, 'client' , 'dist' , 'index.html')));

app.get('*', (res,req) => {

    res.sendFile(path.join(_dirname, '/client'))

})


app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
});