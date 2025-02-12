import asyncHandler from 'express-async-handler';
import { Session } from '../data/session.js';
import { jwtVerify } from 'jose';
import { isObjectIdOrHexString } from 'mongoose';

const { SESSION_SECRET, SESSION_ISSUER } = process.env;
const secretKey = new TextEncoder().encode(SESSION_SECRET);

export const getSession = asyncHandler(async (req, res, next) => {
    const sessionToken = req.cookies.session;
    if (!sessionToken) {
        res.sendStatus(401); // Unauthorized (no session)
        return;
    }

    let sessionId;
    
    try {
        const decryptResult = await jwtVerify(sessionToken, secretKey, { issuer: SESSION_ISSUER });
        sessionId = decryptResult.payload.sessionId;
    } catch (error) {
        res.clearCookie('session'); // Destroy invalid session cookie
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

    req.sessionId = sessionId;
    req.user = session.user;
    next();
});
