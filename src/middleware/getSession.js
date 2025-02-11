import asyncHandler from 'express-async-handler';
import { Session } from '../data/session';

export const getSession = asyncHandler(async (req, res, next) => {
    const sessionId = req.cookies.session;
    if (!sessionId) {
        res.sendStatus(401); // Unauthorized (no session)
        return;
    }

    const session = await Session.findById({ _id: sessionId }).populate('user');
    if (!session || !session.user) {
        res.clearCookie('session'); // Destroy invalid session cookie
        res.sendStatus(401); // Unauthorized (session/user does not exist)
        return;
    }

    req.user = session.user;
    next();
});
