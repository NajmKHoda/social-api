import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    bio: { type: String, default: '' }
});

export const User = model('User', userSchema);