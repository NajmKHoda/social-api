import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRouter from './src/api/users/router.js';
import postsRouter from './src/api/posts/router.js';
import sessionsRouter from './src/api/sessions/router.js';

const app = express();

async function main() {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGODB_URI);

    app.use(express.json());
    app.use(cookieParser())
    app.use('/api/users', usersRouter);
    app.use('/api/posts', postsRouter);
    app.use('/api/sessions', sessionsRouter);

    app.listen(8000, () => console.log('Server is running on port 8000!'));
};

main();