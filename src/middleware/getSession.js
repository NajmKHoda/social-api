import asyncHandler from 'express-async-handler';
import { Session } from '../data/session';
import { jwtDecrypt } from 'jose';
import { isObjectIdOrHexString } from 'mongoose';

const { SESSION_SECRET, SESSION_ISSUER } = process.env;

export const getSession = asyncHandler(async (req, res, next) => {
    const sessionToken = req.cookies.session;
    if (!sessionToken) {
        res.sendStatus(401); // Unauthorized (no session)
        return;
    }

    let sessionId;
    
    try {
        const decryptResult = await jwtDecrypt(sessionToken, SESSION_SECRET, { issuer: SESSION_ISSUER });
        sessionId = decryptResult.payload.sessionId;
    } catch (error) {
        res.clearCookie('error'); // Destroy invalid session cookie
        return res.sendStatus(401); // Unauthorized (invalid session)
    }

    if (!isObjectIdOrHexString(sessionId)) {
        res.clearCookie('session'); 
        return res.sendStatus(401); 
    }

    const session = await Session.findById(sessionId).populate('user');
    if (!session || !session.user) {
        res.clearCookie('session');
        return res.sendStatus(401); 
    }

    req.user = session.user;
    next();
});
