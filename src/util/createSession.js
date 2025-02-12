import { Session } from '../data/session.js';
import { SignJWT } from 'jose';

const { SESSION_SECRET, SESSION_ISSUER } = process.env;
const SESSION_DURATION = parseInt(process.env.SESSION_DURATION);

// Convert SESSION_SECRET to Uint8Array
const secretKey = new TextEncoder().encode(SESSION_SECRET);

export async function createSession(userId, res) {
    const session = await Session.create({ user: userId });
    const sessionId = session._id.toHexString();
    const sessionToken = await new SignJWT({ sessionId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(Math.floor(Date.now() / 1000) + SESSION_DURATION)
        .setIssuer(SESSION_ISSUER)
        .sign(secretKey); // Use the Uint8Array key

    res.cookie('session', sessionToken, {
        httpOnly: true,
        maxAge: SESSION_DURATION * 1000
    });
};
