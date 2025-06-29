# Todo Application with Dark Mode

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v16+-green.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-6.x-green.svg)
![Express](https://img.shields.io/badge/express-5.x-lightgrey.svg)

A full-stack todo application built with React, TypeScript, Express.js, and MongoDB, featuring dark mode functionality.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/todo-with-dark-mode.git
cd todo-with-dark-mode

# Install dependencies for both frontend and backend
npm install

# Set up environment variables
cp server/.env.example server/.env
# Edit server/.env with your MongoDB connection string

# Start the development servers
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

## 📸 Demo

### Light Mode

![Screenshot (5)](https://github.com/user-attachments/assets/13edc680-d600-4504-ad70-61598ad7cfee)


### Dark Mode

![Screenshot (6)](https://github.com/user-attachments/assets/49aa235f-18cc-4194-b4c5-8f43f488b2e7)


### Features in Action

- ✅ Add, edit, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Color-coded todos with custom colors
- ✅ Responsive design (1-3 column grid)
- ✅ Dark/Light mode toggle with persistence

## Project Structure

```
├── server/                 # Backend Express.js application
│   ├── src/
│   │   └── server.ts      # Main server file
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── tests/            # Backend tests
├── todo/                 # Frontend React application
│   ├── src/
│   │   ├── App.tsx       # Main app component
│   │   ├── TodoComponent.tsx
│   │   ├── TodosContextObject.tsx
│   │   └── test/         # Frontend tests
│   └── public/
├── shared/               # Shared TypeScript types
└── README.md
```

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Color-coded todos with custom colors
- ✅ Dark/Light mode toggle with persistence
- ✅ Responsive design (1-3 column grid)
- ✅ Edit todos inline
- ✅ Input validation
- ✅ Comprehensive test coverage

Comprehensive test suite for React components:

- **App Component**

  - Renders main UI elements
  - Loads todos on mount
  - Handles dark mode toggle
  - Persists dark mode preference
  - Allows adding new todos
  - Prevents empty todo submission
  - Handles API errors gracefully

- **TodoComponent**
  - Renders todo data correctly
  - Handles user interactions (edit, delete, mark)
  - Shows appropriate UI states
  - Prevents editing marked todos
  - Handles event propagation correctly

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Git

## API Endpoints

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| GET    | `/api/todos`          | Get all todos          |
| POST   | `/api/todos`          | Create a new todo      |
| PUT    | `/api/todos/:id`      | Update a todo          |
| DELETE | `/api/todos/:id`      | Delete a todo          |
| PATCH  | `/api/todos/:id/mark` | Toggle todo completion |

## Data Model

### Todo Type

```typescript
interface TodoType {
  _id: string;
  todo: string;
  isMarked: boolean;
  todoColor: string;
}
```

## Technologies Used

### Backend

- Express.js - Web framework
- TypeScript - Type safety
- MongoDB - Database
- Mongoose - ODM
- Jest - Testing framework
- Supertest - HTTP testing
- MongoDB Memory Server - In-memory testing

### Frontend

- React 18 - UI framework
- TypeScript - Type safety
- Tailwind CSS - Styling
- Vite - Build tool
- Vitest - Testing framework
- React Testing Library - Component testing
- React Icons - Icon components

## Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting
- **Comprehensive test coverage** for both frontend and backend
- **Input validation** on both client and server
- **Error handling** throughout the application
- **Consistent code formatting** with auto-formatting

## 🚀 Deployment

### Production Build

#### Backend

```bash
cd server
npm run build
npm start
```

#### Frontend

```bash
cd todo
npm run build
npm run preview
```

### Deployment Platforms

- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean, AWS
- **Database**: MongoDB Atlas, AWS DocumentDB

## 🔧 Troubleshooting

### Common Issues

#### MongoDB Connection Issues

```bash
# Check if MongoDB is running
mongosh

# For MongoDB Atlas, ensure:
# 1. IP address is whitelisted
# 2. Database user has proper permissions
# 3. Connection string is correct
```

#### Port Already in Use

```bash
# Kill process using port 8080
npx kill-port 8080

# Or use a different port
PORT=3001 npm run dev
```

#### CORS Issues

If you encounter CORS errors, ensure your backend CORS configuration matches your frontend URL:

```typescript
// server/src/server.ts
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);
```

### Development Guidelines

- **Code Style**: Follow existing TypeScript and React patterns
- **Testing**: Maintain test coverage above 80%
- **Documentation**: Update README for new features
- **Commits**: Use conventional commit messages

### Reporting Issues

Please use the GitHub Issues tab to report bugs or request features. Include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Node.js version, etc.)

## 📝 Changelog

### v1.0.0 (Current)

- ✅ Initial release
- ✅ Full CRUD operations for todos
- ✅ Dark/Light mode toggle
- ✅ Responsive design
- ✅ Comprehensive testing
- ✅ TypeScript implementation
- ✅ Input validation
- ✅ Error handling

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the database
- Tailwind CSS for the styling system
- Vite team for the build tool
- All contributors and testers
