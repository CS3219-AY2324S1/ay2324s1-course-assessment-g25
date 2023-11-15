# Question Service

## Setup

### Work Directory

Run `cd question-service` to the question-service directory.

### Install dependencies

Run `npm install` to install all dependencies specified in `package.json`.

Run `npm ci` to make sure Continuous Integration.

### Start the server in development mode

Run `npm run dev` to start the server in development mode using `nodemon`. 

The server will be running on port 8084.

### Run tests

Run `npm test` to run all tests.

## API

### GET /api/v1/status

#### Response

##### Body

```json
{
    "status": "Running"
}
```

### POST /api/v1/questions

#### Request

##### Body

```json
{
  "title": "Two Sum",
  "description": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
  "category": "Array",
  "complexity": "Easy"
}
```

#### Response

##### Body

```json
{
    "id": 1,
    "title": "Two Sum",
    "description": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    "category": "Array",
    "complexity": "Easy",
    "createdAt": "2019-01-01T00:00:00.000Z",
    "updatedAt": "2019-01-01T00:00:00.000Z"
}
```

### GET /api/v1/questions/:questionId

#### Response

##### Body

```json
{
    "id": 1,
    "title": "Two Sum",
    "description": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    "category": "Array",
    "complexity": "Easy",
    "createdAt": "2019-01-01T00:00:00.000Z",
    "updatedAt": "2019-01-01T00:00:00.000Z"
}
```

### PUT /api/v1/questions/:questionId

#### Request

##### Body

```json
{
  "title": "Two Sum",
  "description": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
  "category": "Array",
  "complexity": "Easy"
}
```

#### Response

##### Body

```json
{
    "id": 1,
    "title": "Two Sum",
    "description": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    "category": "Array",
    "complexity": "Easy",
    "createdAt": "2019-01-01T00:00:00.000Z",
    "updatedAt": "2019-01-01T00:00:00.000Z"
}
```

### DELETE /api/v1/questions/:questionId

#### Response

##### Body

```json
{
    "id": 1,
    "title": "Two Sum",
    "description": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    "category": "Array",
    "complexity": "Easy",
    "createdAt": "2019-01-01T00:00:00.000Z",
    "updatedAt": "2019-01-01T00:00:00.000Z"
}
```

### POST /api/v1/users

#### Request

##### Body

```json
{
    "name": "bob", 
    "email": "bob123@gmail.com", 
    "password": "12345678", 
    "password2": "12345678"
}
```

#### Response

##### Body

```json
{
    "id": 1, 
    "name": "bob", 
    "email": "bob123@gmail.com", 
    "password": "12345678"
}
```

### GET /api/v1/users

#### Response

##### Body

```json
[
    {
        "id": "1",
        "name": "bob",
        "email": "bob123@mail.com",
        "password": "bob123"
    },
    {
        "id": "2",
        "name": "Joe",
        "email": "joe@gmail.com",
        "password": "joepass"
    },
    ...
]
```

### GET /api/v1/users/:userId

#### Response

##### Body

```json
{
    "id": "1",
    "name": "bob",
    "email": "bob123@mail.com",
    "password": "bob123"
}
```

### GET /api/v1/users/byEmail/:email

#### Response

##### Body

```json
{
    "id": "1",
    "name": "bob",
    "email": "bob123@mail.com",
    "password": "bob123"
}
```

### PUT /api/v1/users/:userId

#### Request

##### Body

```json
{
    "name": "bobby",
    "email": "bob123@mail.com",
}
```

#### Response

##### Body

```json
{
    "id": 1, 
    "name": "bobby", 
    "email": "bob123@gmail.com", 
    "password": "12345678"
}
```

### DELETE /api/v1/users/usersId

#### Response

##### Body

```json
{
    "id": 1, 
    "name": "bob", 
    "email": "bob123@gmail.com", 
    "password": "12345678"
}
```