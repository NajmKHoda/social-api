import { model, Schema } from 'mongoose'

const SESSION_TIME = 7 * 24 * 60 * 60; // 1 week

const sessionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    lastActive: { type: Date, default: Date.now, expires: SESSION_TIME }
});

export const Session = model('Session', sessionSchema);