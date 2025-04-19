# API Documentation

## Register User Endpoint

### Endpoint
`POST /users/register`

### Description
This endpoint registers a new user. It validates the incoming data and, if successful, creates a user with a hashed password and returns a JWT authentication token along with the user data.

### Request Body
The endpoint expects a JSON body with the following structure:

| Field                   | Type   | Required | Description                                                                 |
|-------------------------|--------|----------|-----------------------------------------------------------------------------|
| `fullname.firstname`    | String | Yes      | First name of the user. Must be at least 3 characters long.                 |
| `fullname.lastname`     | String | No       | Last name of the user. If provided, must be at least 3 characters long.       |
| `email`                 | String | Yes      | Valid email address. Must be at least 5 characters long.                    |
| `password`              | String | Yes      | Password for the user. Must be at least 6 characters long.                  |

#### Example Request
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "secret123"
}
```

### Responses

#### Success
- **Status Code:** `201 Created`
- **Response Body:**
```json
{
    "token": "<JWT Token>",
    "user": {
        "_id": "<User ID>",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
        // Other fields as applicable
    }
}
```

#### Validation Error
- **Status Code:** `422 Unprocessable Entity`
- **Response Body:**
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        }
        // Additional error objects if present
    ]
}
```

#### Server Error
- **Status Code:** `500 Internal Server Error`
- **Response Body:**
```json
{
    "error": "Error message explaining the cause"
}
```

### Additional Information
- **Password Hashing:** The provided password is hashed using bcrypt before saving to the database.
- **JWT Token:** A JWT token is generated upon successful registration using the secret defined in your environment variables (`JWT_SECRET`).
- **Content-Type:** Ensure that the `Content-Type` header is set to `application/json` when making requests.
