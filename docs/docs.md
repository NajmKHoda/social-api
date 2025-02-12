# Documentation

Welcome to the docs. Click on the following methods to view their required request formats and response values.

### User Routes
- **[`POST /api/users`](./users.md#post-apiusers)**: Register a new user
- **[`GET /api/users/[id]`](./users.md#get-apiusersid)**: Retrieve user information by ID
- **[`DELETE /api/users/[id]`](./users.md#delete-apiusersid)**: Delete a user by ID
- **[`GET /api/users/[id]/posts`](./users.md#get-apiusersidposts)**: Retrieve a user's posts

### Post Routes
- **[`POST /api/posts`](./posts.md#post-apiposts)**: Create a new post
- **[`GET /api/posts/[id]`](./posts.md#get-apipostsid)**: Retrieve a post by ID
- **[`DELETE /api/posts/[id]`](./posts.md#delete-apipostsid)**: Delete a post by ID
- **[`POST /api/posts/[id]/like`](./posts.md#post-apipostsidlike)**: Like a post
- **[`DELETE /api/posts/[id]/like`](./posts.md#delete-apipostsidlike)**: Unlike a post
- **[`GET /api/posts/[id]/flag`](./posts.md#get-apipostsidflag)**: Obtain a post's flags **(admins only)**
- **[`POST /api/posts/[id]/flag`](./posts.md#post-apipostsidflag)**: Flag a post for review

### Session Routes
- **[`POST /api/sessions`](./sessions.md#post-apisessions)**: Log in and create a new session
- **[`DELETE /api/sessions`](./sessions.md#delete-apisessions)**: Log out and delete the current session
