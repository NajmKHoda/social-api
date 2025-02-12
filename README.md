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

## Available Routes

This API exposes the following routes and methods:

### User Routes
- **`POST /api/users`**: Register a new user
- **`GET /api/users/[id]`**: Retrieve user information by ID
- **`DELETE /api/users/[id]`**: Delete a user by ID
- **`GET /api/users/[id]/posts`**: Retrieve a user's posts

### Post Routes
- **`POST /api/posts`**: Create a new post
- **`GET /api/posts/[id]`**: Retrieve a post by ID
- **`DELETE /api/posts/[id]`**: Delete a post by ID
- **`POST /api/posts/[id]/like`**: Like a post
- **`DELETE /api/posts/[id]/like`**: Unlike a post
- **`GET /api/posts/[id]/flag`**: Obtain a post's flags **(admins only)**
- **`POST /api/posts/[id]/flag`**: Flag a post for review

### Session Routes
- **`POST /api/sessions`**: Log in and create a new session
- **`DELETE /api/sessions`**: Log out and delete the current session

Check out the [full documentation](./docs/docs.md).

## Setup

To set up the project, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/NajmKHoda/social-api.git
    cd social-api
    ```

2. **Install dependencies** using `npm`:
    ```sh
    npm install
    ```

3. **Set up the database**:

    Head to the [MongoDB website](https://www.mongodb.com/) and create an account. Then, follow the instructions of [this article](https://www.mongodb.com/resources/products/fundamentals/create-database#using-the-mongodb-atlas-ui) to create a database using MongoDB Atlas. Obtain the URI provided by Atlas for your cluster by selecting **Connect** on the project overview page and following the instructions.

4. **Set up environment variables**:

    Create a `.env` file in the root directory. The `.env` file **MUST** declare the following variables:
    ```env
    MONGODB_URI= # URI provided by MongoDB Atlas

    ADMIN_SECRET= # Secret for admin account creation
    
    SESSION_SECRET= # Signing secret for session cookies
    SESSION_DURATION= # Length of a session, in seconds
    SESSION_ISSUER= # Name of the app providing the session
    ```
    You can also declare a `PORT` variable if you want to bind to a port other than `8000`.
    You may refer to [`.env.example`](/.env.example) for a template.

4. (optional) **Configure prohibited words**:

    The [`/config/disallowedWords.txt`](/config/disallowedWords.txt) file contains the list of all words (each on their own line) used by the content filter. If a post contains *any* word in this list, it is not published. Feel free to change this list to suit your needs.

5. **Start the server**:
    ```sh
    npm start
    ```

Your API server should now be running.