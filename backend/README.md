# Task Management API

A RESTful API for task management built with Node.js, Express, and **MySQL** (using Sequelize ORM).

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **Task Management**: Full CRUD operations for tasks
- **Secure**: Password hashing with bcryptjs
- **Status Tracking**: Tasks can be in 'pending', 'in_progress', or 'done' status
- **MySQL Database**: Using Sequelize ORM for database operations

## Prerequisites

- Node.js (v14 or higher)
- MySQL (running locally or remote connection)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=task_manager
DB_DIALECT=mysql
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
```

4. Create MySQL database:
```sql
CREATE DATABASE task_manager;
```

5. The tables will be created automatically when you start the server (Sequelize auto-sync)

## Running the Application

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## Database Schema

### Users Table
- `id`: INT (Primary Key, Auto Increment)
- `name`: VARCHAR(255)
- `email`: VARCHAR(255) (Unique)
- `password`: VARCHAR(255) (Hashed)
- `createdAt`: DATETIME
- `updatedAt`: DATETIME

### Tasks Table
- `id`: INT (Primary Key, Auto Increment)
- `title`: VARCHAR(255)
- `description`: TEXT
- `status`: ENUM('pending', 'in_progress', 'done')
- `user_id`: INT (Foreign Key → users.id)
- `created_at`: DATETIME
- `createdAt`: DATETIME
- `updatedAt`: DATETIME

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```

### Tasks

#### Create Task
```
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task management API",
  "status": "pending"
}
```

#### Get All Tasks
```
GET /api/tasks
Authorization: Bearer <token>
```

#### Update Task
```
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in_progress"
}
```

#### Delete Task
```
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

## Project Structure

```
task-management/
├── src/
│   ├── config/
│   │   └── db.js              # Sequelize connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── taskController.js  # Task CRUD logic
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── index.js           # Model relationships
│   │   ├── User.js            # User model (Sequelize)
│   │   └── Task.js            # Task model (Sequelize)
│   ├── routes/
│   │   ├── authRoutes.js      # Auth routes
│   │   └── taskRoutes.js      # Task routes
│   └── server.js              # Main server file
├── .env                       # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Testing with cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Create Task (replace TOKEN with your JWT):**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"My First Task","description":"Test task","status":"pending"}'
```

**Get Tasks:**
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN"
```

## MySQL Setup

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

### macOS
```bash
brew install mysql
brew services start mysql
```

### Create Database
```bash
mysql -u root -p
CREATE DATABASE task_manager;
EXIT;
```

## License

ISC
