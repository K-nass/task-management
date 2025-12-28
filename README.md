# Task Management System

A full-stack task management application with a Node.js/Express/MySQL backend and a modern React/Vite frontend.

## Project Structure

- `backend/`: Node.js API with Sequelize ORM and MySQL.
- `frontend/`: React application built with Vite, TypeScript, and a premium dark mode UI.

---

## 🚀 Backend Setup

### Prerequisites
- Node.js (v14+)
- MySQL Server

### Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the `backend/` directory with the following content:
   ```env
   PORT=5000
   DB_NAME=task_manager
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```
4. Database Setup:
   Ensure MySQL is running and create the database:
   ```sql
   CREATE DATABASE task_manager;
   ```

### Running the Server
```bash
npm run dev
```
The API will be available at `http://localhost:5000`.

---

## 💻 Frontend Setup

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application
```bash
npm run dev
```
The application will start on `http://localhost:5173`.

---

## 🛠 API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive a JWT (set as an HTTP-only cookie).
- `POST /api/auth/logout`: Logout and clear the session cookie.
- `GET /api/auth/me`: Get current user profile (Protected).

### Tasks
- `GET /api/tasks`: Retrieve all tasks for the authenticated user (Protected).
- `POST /api/tasks`: Create a new task (Protected).
- `PUT /api/tasks/:id`: Update an existing task (Protected).
- `DELETE /api/tasks/:id`: Delete a task (Protected).

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express, MySQL, Sequelize, JWT, bcryptjs.
- **Frontend**: React 19, Vite, TypeScript, Axios, React Router, TanStack Query.

## License
ISC
