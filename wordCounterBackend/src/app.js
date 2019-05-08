import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import mongooseConnection from './config/db';
import indexRouter from './routes/index';

const app = express();

// Cross platform origin resource sharing
app.use(cors());

// Database connection
mongooseConnection();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', indexRouter);

export default app;
