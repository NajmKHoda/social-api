import asyncHandler from 'express-async-handler';
import { Post } from '../../data/post.js';
import { isContentAllowed } from '../../util/contentFilter.js';
import { isObjectIdOrHexString } from 'mongoose';

export const handlePostCreation = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    if (typeof title !== 'string' || typeof content !== 'string')
        return res.sendStatus(400); // Bad Request (no title or content)

    if (!isContentAllowed(content) || !isContentAllowed(title))
        return res.sendStatus(403); // Forbidden (disallowed content)

    // Create the post
    const author = req.user._id;
    await Post.create({ title, content, author });

    res.sendStatus(201); // Post created
});

export const handlePostDeletion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isObjectIdOrHexString(id))
        return res.sendStatus(400); // Bad Request (no valid post id)

    const post = await Post.findById(id).lean();

    if (!post)
        return res.sendStatus(404); // Post not found
    if (!req.user.isAdmin && post.author !== req.user._id)
        return res.sendStatus(403); // Forbidden (not an admin/the author)

    // Delete the post
    await Post.findByIdAndDelete(id);

    res.sendStatus(204); // Deletion successful
});

export const handlePostRetrieval = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isObjectIdOrHexString(id))
        return res.sendStatus(400); // Bad Request (no valid post id)

    const post = await Post
        .findById(id)
        .select('-flags') // Remove flags (admin-only information)
        .lean();

    res.json({
        id: post._id,
        authorId: post.author.toHexString(),
        title: post.title,
        content: post.content,
        creationTime: post.creationTime,
        likedBy: post.likedBy.map(id => id.toHexString())
    });
});

// LIKES

export const handleLike = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isObjectIdOrHexString(id))
        return res.sendStatus(400); // Bad Request (no valid post id)

    const post = await Post.findById(id).select('likedBy');
    if (!post)
        return res.sendStatus(404); // Post not found

    if (post.likedBy.includes(req.user._id))
        return res.sendStatus(409); // Conflict (already liked)

    likedBy.push(req.user._id);
    post.save();

    res.send(201); // Like created
});

export const handleUnlike = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isObjectIdOrHexString(id))
        return res.sendStatus(400); // Bad Request (no valid post id)

    const post = await Post.findById(id).select('likedBy');
    if (!post)
        return res.sendStatus(404); // Post not found

    const index = post.likedBy.indexOf(req.user._id);
    if (index === -1)
        return res.sendStatus(409); // Conflict (not liked)

    // Remove the like
    likedBy.splice(index, 1);
    post.save();

    res.sendStatus(204); // Unlike successful
});


// FLAGGING

export const handleFlagCreation = asyncHandler(async (req, res) => {
    const { id, reason } = req.body;
    if (typeof reason !== 'string' || !isObjectIdOrHexString(id))
        return res.sendStatus(400); // Bad Request (no reason/post to flag)

    const post = await Post.findByIdAndUpdate(id);
    if (!post)
        return res.sendStatus(404); // Post not found

    post.flags.push({ reporter: req.user._id, reason });
    post.save();

    res.sendStatus(201); // Flag created
});

export const handleFlagsRetrieval = asyncHandler(async (req, res) => {
    if (!req.user.isAdmin)
        return res.sendStatus(403); // Forbidden (not an admin)

    const { id } = req.params;
    if (!isObjectIdOrHexString(id))
        return res.sendStatus(400); // Bad Request (no post id)

    const post = await Post.findById(id).select('flags').lean();
    if (!post)
        return res.sendStatus(404); // Post not found

    res.json(post.flags);
});