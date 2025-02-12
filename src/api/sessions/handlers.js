import bcrypt from 'bcrypt';
import { User } from '../../data/user.js';
import { Session } from '../../data/session.js';
import asyncHandler from 'express-async-handler';
import { isObjectIdOrHexString } from 'mongoose';
import { createSession } from '../../util/createSession.js';

export const handleLogin = asyncHandler(async (req, res) => {
    const auth = req.get('Authorization');
    if (!auth) return res.sendStatus(400); // Bad Request (no Authorization header)

    const [username, password] = Buffer.from(auth, 'base64').toString().split(':', 2);
    if (!username || !password) return res.sendStatus(400); // Bad Request (no username or password)

    const user = await User.findOne({ username }).select('username password').lean();
    if (!user) return res.sendStatus(404); // User not found

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch)
        return res.sendStatus(401); // Unauthorized

    // Create the session and set the cookie
    await createSession(user._id, res);

    res.sendStatus(200); // Request succeeded
});

export const handleLogout = asyncHandler(async (req, res) => {
    if (!isObjectIdOrHexString(req.sessionId))
        return res.sendStatus(401); // Unauthorized

    await Session.findByIdAndDelete(req.sessionId);
    res.clearCookie('session');

    res.sendStatus(204); // Deletion successful
});