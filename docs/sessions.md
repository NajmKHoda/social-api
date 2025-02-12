# Session Routes

[Back to main documentation](./docs.md)

## GET /api/sessions
Log in and create a new session.

### Required Headers
- `Authorization`: Basic authentication userpass. This should be constructed by concatenating the username and password with a colon (`username:password`) and encoding it into base 64.

### Response
- `200 OK`: Successful login. The user obtains a `session` cookie containing the session token.
- `400 Bad Request`: Invalid input data.
- `401 Unauthorized`: Invalid password.
- `404 Not Found`: User not found.

## DELETE /api/sessions
Log out and delete the current session.

### Response
- `204 No Content`: Successful logout.
- `400 Bad Request`: The user is not logged in or has an invalid session.
