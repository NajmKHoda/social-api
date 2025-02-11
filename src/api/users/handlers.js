import bcrypt from 'bcrypt';
import { User } from '../../data/user.js';
import { Session } from '../../data/session.js';
import asyncHandler from 'express-async-handler'
import { isContentAllowed } from '../../util/contentFilter.js';
import { isObjectIdOrHexString } from 'mongoose';
import { Post } from '../../data/post.js';

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

export const handleRegistration = asyncHandler(async (req, res) => {
    const { username, password, bio } = req.body;
    if (typeof username !== 'string' ||
        !isContentAllowed(username) ||
        typeof password !== 'string' ||
        typeof bio !== 'string' ||
        !isContentAllowed(bio))
        return res.sendStatus(400); // Bad Request (bad username/password/bio)

    const encryptedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
        username,
        password: encryptedPassword,
        isAdmin: false
    });

    // Create a session for the new user
    const session = await Session.create({ user: user._id });
    res.cookie('session', session._id, { httpOnly: true });

    res.sendStatus(201); // Account created
});

export const handleUserRetrieval = asyncHandler(async (req, res) => {
    const { id } = req.query;
    if (!isObjectIdOrHexString(id))
        return res.sendStatus(400); // Bad Request (no user id)

    const user = await User.findById(id).select('username bio').lean();
    if (!user)
        return res.sendStatus(404); // User not found

    res.json({
        id: user._id,
        username: user.username,
        bio: user.bio
    });
});

export const handleUserPostsRetrieval = asyncHandler(async (req, res) => {
    const { id } = req.query;
    if (!isObjectIdOrHexString(id))
        return res.sendStatus(400); // Bad Request (no user id)

    const posts = (await Post.find({ author: id }).lean()).map(post => ({
        id: post._id,
        title: post.title,
        content: post.content,
        creationTime: post.creationTime
    }));

    res.json(posts);
});