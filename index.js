import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRouter from './src/api/users/router.js';

const app = express();

async function main() {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGODB_URI);

    app.use(express.json());
    app.use(cookieParser())
    app.use('/api/users', usersRouter);

    app.listen(8000, () => console.log('Server is running on port 8000!'));
};

main();