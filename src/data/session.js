import { model, Schema } from 'mongoose'

const { SESSION_DURATION } = process.env;

const sessionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    lastActive: { type: Date, default: Date.now, expires: SESSION_DURATION }
});

export const Session = model('Session', sessionSchema);