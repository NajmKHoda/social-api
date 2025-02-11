import 'dotenv/config';
import Express from 'express';
import mongoose from 'mongoose';

const app = Express();

async function main() {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGODB_URI);

    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.listen(8000, () => console.log('Server is running on port 8000!'));
};

main();