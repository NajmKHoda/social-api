import bcrypt from 'bcrypt';
import { User } from '../../data/user.js';
import { Session } from '../../data/session.js';
import asyncHandler from 'express-async-handler'
import { isContentAllowed } from '../../util/contentFilter.js';
import { isObjectIdOrHexString } from 'mongoose';
import { Post } from '../../data/post.js';

const { ADMIN_SECRET } = process.env;

export const handleRegistration = asyncHandler(async (req, res) => {
    const { username, password, bio, adminSecret } = req.body;
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
        isAdmin: adminSecret === ADMIN_SECRET,
    });

    // Create a session for the new user
    const session = await Session.create({ user: user._id });
    res.cookie('session', session._id, { httpOnly: true });

    res.sendStatus(201); // Account created
});

export const handleUserRetrieval = asyncHandler(async (req, res) => {
    const { id } = req.params;
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

export const handleUserDeletion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isObjectIdOrHexString(id))
        return res.sendStatus(400); // Bad Request (no user id)

    if (!req.user.isAdmin && req.user._id !== id)
        return res.sendStatus(403); // Forbidden (not an admin/the user)

    // Delete the user
    await User.findByIdAndDelete(id);

    res.sendStatus(204); // Deletion successful
});

export const handleUserPostsRetrieval = asyncHandler(async (req, res) => {
    const { id } = req.params;
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