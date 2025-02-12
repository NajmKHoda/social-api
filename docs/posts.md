# Post Routes

[Back to main documentation](./docs.md)

## POST /api/posts
Create a new post with the given title and contents.

### Request Body
```ts
{
    title: string,
    content: string
}
```

### Response
- `201 Created`: Post created successfully.
- `401 Unauthorized`: The user is not logged in.
- `403 Forbidden`: The post contains one or more prohibited word(s).

## GET /api/posts/[id]
Retrieve a post by ID.

### Response
- `200 OK`: Post retrieved successfully. The response's body is formatted like so:
```ts
{
    id: string,
    authorId: string,
    title: string,
    content: string,
    creationTime: string,
    likedBy: string[] // IDs of users who liked this post.
}
```
- `400 Bad Request`: Invalid post ID.
- `404 Not Found`: Post not found.

## DELETE /api/posts/[id]
Delete a post by ID.

### Response
- `204 No Content`: Post deleted successfully.
- `400 Bad Request`: Invalid post ID.
- `401 Unauthorized`: The user is not logged in.
- `403 Forbidden`: The user is not allowed to delete this post since they are not an admin or the post's author.
- `404 Not Found`: Post not found.

## POST /api/posts/[id]/like
Like a post.

### Response
- `201 Created`: Post liked successfully.
- `400 Bad Request`: Invalid post ID.
- `401 Unauthorized`: The user is not logged in.
- `404 Not Found`: Post not found.
- `409 Conflict`: The user has already liked this post.

## DELETE /api/posts/[id]/like
Unlike a post.

### Response
- `204 No Content`: Post unliked successfully.
- `400 Bad Request`: Invalid post ID.
- `401 Unauthorized`: The user is not logged in.
- `404 Not Found`: Post not found.
- `409 Conflict`: The user hasn't liked this post.

## GET /api/posts/[id]/flag
Obtain a post's flags **(admins only)**.

### Response
- `200 OK`: Post flags retrieved successfully. The response's body is formatted like so:
```ts
[
    {
        reporter: string, // ID of the user who reported this post
        reason: string
    }
]
```
- `400 Bad Request`: Invalid post ID.
- `401 Unauthorized`: The user is not logged in.
- `403 Forbidden`: The user is not an admin.
- `404 Not Found`: Post not found.

## POST /api/posts/[id]/flag
Flag a post for review.

### Response
- `201 Created`: Post flagged successfully.
- `400 Bad Request`: Invalid post ID.
- `401 Unauthorized`: The user is not logged in.
- `404 Not Found`: Post not found.
