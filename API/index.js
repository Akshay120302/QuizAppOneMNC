import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

const _dirname = path.resolve();
const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://quizapp-onemnc.onrender.com'],
    credentials: true,
  }));

app.use(express.json());
app.use(cookieParser());

app.listen(3001, () => {
  console.log('Server is up and running at 3001');
});


app.use('/API/user/', userRouter);
app.use('/API/auth/', authRouter);
app.use('/API/listing', listingRouter);

app.use(express.static(path.join(_dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
