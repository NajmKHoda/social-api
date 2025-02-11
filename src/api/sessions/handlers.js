import bcrypt from 'bcrypt';
import { User } from '../../data/user.js';
import { Session } from '../../data/session.js';
import asyncHandler from 'express-async-handler';
import { isObjectIdOrHexString } from 'mongoose';

export const handleLogin = asyncHandler(async (req, res) => {
    const auth = req.get('Authorization');
    if (!auth) return res.sendStatus(400); // Bad Request (no Authorization header)

    const [username, password] = Buffer.from(auth, 'base64').toString().split(':');
    if (!username || !password) return res.sendStatus(400); // Bad Request (no username or password)

    const user = await User.findOne({ username }).select('username password').lean();
    if (!user) return res.sendStatus(404); // User not found

    const encryptedPassword = await bcrypt.hash(password, 12);
    if (user.password !== encryptedPassword) return res.sendStatus(401); // Unauthorized

    // Create the session and give the user the session token
    const session = await Session.create({ user: user._id });
    res.cookie('session', session._id, { httpOnly: true });
    
    res.sendStatus(200); // Request succeeded
});

export const handleLogout = asyncHandler(async (req, res) => {
    if (!isObjectIdOrHexString(req.cookies.session))
        return res.sendStatus(400); // Bad Request (no session)

    await Session.findByIdAndDelete(req.cookies.session);
    res.clearCookie('session');

    res.sendStatus(204); // Deletion successful
});