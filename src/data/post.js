import { model, Schema } from 'mongoose';

const postSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    creationTime: { type: Date, default: Date.now },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    flags: [{ 
        reporter: { type: Schema.Types.ObjectId, ref: 'User' },
        reason: { type: String, required: true }
    }]
});

export const Post = model('Post', postSchema);