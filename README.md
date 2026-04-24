# Task Management Application

A production-ready full-stack task management application built with Node.js, Express, React, and PostgreSQL. This application allows users to securely register, login, and manage their own isolated tasks.

## Features Implemented

- **Secure Authentication**:
   - User Signup and Login.
   - Password hashing using `bcrypt`.
   - Protected routes verified via JSON Web Tokens (JWT).
- **Multi-User Task Management**:
   - Users can create, view, update (pending to completed), and delete tasks.
   - Strict data isolation: Users can only access their own tasks.
- **Responsive UI**:
   - Clean, functional interface built with React and Tailwind CSS.
- **Robust Architecture**:
   - Built following MVC principles (Models, Views/React, Controllers).
   - Global error handling, input validation, and proper database relationships.

## Tech Stack Used

**Frontend:**

- React (Vite)
- Tailwind CSS
- React Router (Client-side routing)
- Axios (HTTP requests)
- Context API (Global state management)

**Backend:**

- Node.js & Express
- PostgreSQL (Database)
- Sequelize (ORM)
- JWT (Authentication)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) (Running locally)
- [Git](https://git-scm.com/)

---

## Setup Steps

This repository contains both the client and server code in a monorepo structure. You will need to start both servers concurrently.

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd productSpaceCompany
```

### 2. Database Setup

1. Open **pgAdmin** or your terminal.
2. Create a new, empty PostgreSQL database named: `task_manager_db`
   ```sql
   CREATE DATABASE task_manager_db;
   ```
   _(Note: Sequelize automatically generates the `Users` and `Tasks` tables upon server start)._

### 3. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add your Postgres credentials:

```env
PORT=5000
DB_NAME=task_manager_db
DB_USER=postgres
DB_PASSWORD=your_postgresql_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=super_secret_jwt_string_replace_in_production
```

Start the backend development server:

```bash
npm run dev
```

### 4. Frontend Setup

Open a new terminal, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```

Start the frontend Vite server:

```bash
npm run dev
```

### 5. Access the Application

Open your browser and navigate to the frontend URL (typically `http://localhost:5173` or `http://localhost:5174`).

---

## 🛣️ API Endpoints

### Authentication

- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Authenticate user and get token
- `GET /api/auth/me` - Get current logged-in user profile

### Tasks

_(Require Bearer Token in `Authorization` header)_

- `GET /api/tasks` - Retrieve all tasks for the logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task (e.g., status, title)
- `DELETE /api/tasks/:id` - Delete a task

---

## 🗂️ Project Structure

```
productSpaceCompany/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── pages/          # React Components (Login, Register, Dashboard)
│   │   ├── App.jsx         # Main App Component & Routing
│   │   └── main.jsx        # React Application Entry Point
│   └── vite.config.js      # Vite Configuration
│
└── server/                 # Backend Node.js Application
    ├── src/
    │   ├── config/         # Database configuration string
    │   ├── controllers/    # Route handler logic (Auth, Tasks)
    │   ├── middlewares/    # Custom middlewares (JWT Verification)
    │   ├── models/         # Sequelize Models (User, Task, index associations)
    │   ├── routes/         # Express endpoint definitions
    │   └── index.js        # Main Express App Entry point
    └── .env                # Backend Environment Variables
```
