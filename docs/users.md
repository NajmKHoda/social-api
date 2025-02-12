# User Routes

[Back to main documentation](./docs.md)

## POST /api/users
Register a new user.

### Request Body
```ts
{
    username: string,
    password: string,
    bio: string,
    adminSecret?: string
}
```

### Response
- `201 Created`: Account created successfully. If `adminSecret` is provided and matches the server's `ADMIN_SECRET` variable, the account is given admin permissions. The user obtains a session token through the `session` cookie.
- `400 Bad Request`: Invalid input data.

## GET /api/users/[id]
Retrieve user information by ID.

### Response
- `200 OK`: User information retrieved successfully. The response's body is formatted like so:
```ts
{
    id: string,
    username: string,
    bio: string
}
```
- `400 Bad Request`: Invalid user ID.
- `404 Not Found`: User not found.

## DELETE /api/users/[id]
Delete a user by ID.

### Response
- `204 No Content`: User deleted successfully.
- `400 Bad Request`: Invalid user ID.
- `401 Unauthorized`: The user is not logged in.
- `403 Forbidden`: The user cannot perform this deletion, as they are not an admin or the user to be deleted.
- `404 Not Found`: User not found.

## GET /api/users/[id]/posts
Retrieve a user's posts.

### Response
- `200 OK`: User's posts retrieved successfully. The response's body is formatted like so:
```ts
[
    {
        id: string,
        title: string,
        content: string,
        creationTime: Date,
        likedBy: string[] // IDs of users who liked this post
    }
]
```
- `400 Bad Request`: Invalid user ID.