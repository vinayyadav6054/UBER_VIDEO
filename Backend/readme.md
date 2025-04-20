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
- **Status Code:** `400 Bad Request`
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
- **Password Hashing:** Provided password is hashed using bcrypt before saving to the database.
- **JWT Token:** Generated upon successful registration using the secret defined in your environment variables (`JWT_SECRET`).
- **Content-Type:** Ensure that the `Content-Type` header is set to `application/json` when making requests.

---

## Login User Endpoint

### Endpoint
`POST /users/login`

### Description
This endpoint logs an existing user into the system. It validates the provided credentials and, if valid, returns a JWT authentication token along with the user data.

### Request Body
The endpoint expects a JSON body with the following structure:

| Field      | Type   | Required | Description                |
|------------|--------|----------|----------------------------|
| `email`    | String | Yes      | Registered email address   |
| `password` | String | Yes      | User's password            |

#### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "secret123"
}
```

### Responses

#### Success
- **Status Code:** `200 OK`
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
- **Status Code:** `400 Bad Request`
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

#### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Response Body:**
```json
{
    "message": "Invalid email or password"
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
- **Password Comparison:** The provided password is compared against the hashed password stored in the database using bcrypt.
- **JWT Token:** Generated upon successful login using the secret defined in your environment variables (`JWT_SECRET`).
- **Content-Type:** Ensure that the `Content-Type` header is set to `application/json` when making requests.

---

## Get User Profile Endpoint

### Endpoint
`GET /users/profile`

### Description
This endpoint retrieves the profile of the currently authenticated user. The token is expected to be passed via cookies or Authorization header (Bearer token).

### Authentication
- This endpoint is protected. A valid JWT token must be provided.

### Responses

#### Success
- **Status Code:** `200 OK`
- **Response Body:**
```json
{
    "_id": "<User ID>",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // Other fields as applicable
}
```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Response Body:**
```json
{
    "message": "Unauthorized"
}
```

---

## Logout User Endpoint

### Endpoint
`GET /users/logout`

### Description
This endpoint logs out the currently authenticated user by clearing the authentication token stored in cookies. After invoking this route, the token will no longer be valid for accessing protected resources.

### Authentication
- This endpoint is protected. A valid JWT token must be provided.

### Responses

#### Success
- **Status Code:** `200 OK`
- **Response Body:**
```json
{
    "message": "Logged out"
}
```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Response Body:**
```json
{
    "message": "Unauthorized"
}
```

### Additional Information
- **Token Clearing:** The token is cleared from the cookies.
- **Content-Type:** Ensure that the `Content-Type` header is set to `application/json` when making requests.