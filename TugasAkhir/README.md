# To-Do List App

A simple To-Do List application built with ExpressJS, utilizing JSON and REST API.

## Introduction

This To-Do List App allows users to manage their tasks efficiently. It provides a RESTful API for seamless integration with client applications.

## Download source code

```bash
git clone https://github.com/ahmadhudasalam/gamelab-express-json-rest-api

cd gamelab-express-json-rest-api/TugasAkhir/
```

## Structure Folder Application

```bash
.
├── config
│   └── database.js
├── controllers
│   ├── TaskController.js
│   └── UserController.js
├── database
│   ├── schema.sql
│   └── todo_app.sql
├── middleware
│   └── authMiddleware.js
├── models
│   ├── Task.js
│   └── User.js
├── routes
│   ├── api.js
│   └── web.js
├── views
│   ├── index.ejs
│   ├── login.ejs
│   ├── profile.ejs
│   ├── register.ejs
│   └── task.ejs
├── app.js
├── .env
├── .env.example
├── package.json
├── package-lock.json
└── README.md
```

## Dependencies

- `bcrypt`: A library for hashing passwords.
- `cookie-parser`: A middleware for parsing cookies in Express.
- `dotenv`: A module for loading environment variables from a .env file.
- `ejs`: A template engine for rendering dynamic HTML pages.
- `express`: A web application framework for Node.js.
- express-flash: A middleware for displaying flash messages in Express.
- `express-session`: A middleware for managing sessions in Express.
- `jsonwebtoken`: A library for generating and verifying JSON Web Tokens (JWT).
- `morgan`: A middleware for logging HTTP requests in Express.
- `mysql`: A library for interacting with MySQL databases.
- `nodemon`: A tool for automatically restarting the server during development.

## Database Schema

The application uses a MySQL database named todo_app. Below are the tables used:

### Table: users

- `id` (INT)
- `email` (VARCHAR(255))
- `password` (VARCHAR(255))

### Table: tasks

- `id` (INT)
- `user_id` (INT)
- `title` (VARCHAR(50))
- `completed` (BOOLEAN)
- `FOREIGN KEY (user_id) REFERENCES users(id)`

## Setup database (MySQL)

```bash
sudo mysql -u [username] -p

CREATE DATABASE todo_app;

exit;

sudo mysql -u [username] -p todo_app < database/todo_app.sql
```

### Setup Environment Variable

```bash
cp .env.example .env
```

## Run Application

```bash
npm install

npm run dev
```

## Routes

The application has two sets of routes: web and API routes.

### API Routes

- `GET /api`
- `POST /api/register`
  - Request Body:
  ```json
  {
    "email": "example@example.com",
    "password": "password"
  }
  ```
- `POST /api/login`
  - Request Body:
  ```json
  {
    "email": "example@example.com",
    "password": "password"
  }
  ```
- `GET /api/profile` (Requires JWT)
- `GET /api/task` (Requires JWT)
- `GET /api/task/:id` (Requires JWT)
- `GET /api/task/completed` (Requires JWT)
- `POST /api/task` (Requires JWT)
  - Request Body:
  ```json
  {
    "title": "Task title"
  }
  ```
  - `PUT /api/task/:id` (Requires JWT)
  - Request Body
  ```json
  {
    "title": "Update Task Title",
    "completed": true
  }
  ```
  - **Notes**: The `title` and `completed` fields are optional. You can send either one or both of them in the request body.
- `DELETE /api/task/:id` (Requires JWT)
- `DELETE /api/task` (Requires JWT)

### Web Routes

- `/` (Optional JWT)
- `/register`
- `/login`
- `/task` (Requires JWT)
- `/profile` (Requires JWT)
