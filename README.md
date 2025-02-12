# Social Media API Backend

This is a simple API backend for a social media app. Its features include:

- User registration and deletion.
- Post creation, deletion, (un)liking, and flagging.
- A simple content filter that checks and prevents publishing of posts if they contain certain prohibited words.
- Admin users with permission to delete posts, delete users, and review flagged posts.

This API uses **Node/Express.js** for the backend and **MongoDB** for the database.

## Security

This API uses the following precautions to ensure user safety:

- Passwords are hashed using the `bcrypt` library and stored in the database in their encrypted form. The hash function is one-way, so a bad actor with access to the database wouldn't be able to reverse-engineer passwords.
- Session cookies are encrypted using the [JSON Web Token protocol](https://datatracker.ietf.org/doc/html/rfc7519). This involves signing with a server-defined *secret* to allow detection of modified session cookies.
- Sessions only last for a server-defined amount of time. This reduces the probability of a session replay attack by invalidating session cookies while not in use.
- To create an admin account, a user must provide the server-defined **admin secret** alongisde their account registration information.