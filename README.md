# Todo Application with Dark Mode

A full-stack todo application built with React, TypeScript, Express.js, and MongoDB, featuring dark mode functionality and comprehensive testing.

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

## Issues Fixed

### Backend Issues Fixed

1. **Typos in Error Messages**

   - Fixed "messgae" → "message"
   - Fixed "occured" → "occurred"

2. **Inconsistent Error Messages**

   - Changed "Product not found" → "Todo not found" for consistency

3. **Missing Return Statements**

   - Added `return` statements after error responses to prevent further execution

4. **Type Inconsistencies**

   - Fixed `String` → `string` for parameter types

5. **Input Validation**

   - Added comprehensive input validation for todo creation and updates
   - Validates required fields, data types, and empty strings

6. **HTTP Status Codes**

   - Changed POST response from 200 → 201 (Created)
   - Added proper 400 responses for validation errors

7. **Database Query Options**
   - Added `{ new: true }` option to `findByIdAndUpdate` to return updated document

### Frontend Issues Fixed

1. **Type Consistency**

   - Fixed parameter types from `String` → `string` in context functions

2. **Error Handling**
   - Added proper error handling for API calls
   - Added console error logging for debugging

## Testing

### Backend Tests

Comprehensive test suite for all API endpoints:

- **GET /api/todos**

  - Returns empty array when no todos exist
  - Returns all todos when they exist

- **POST /api/todos**

  - Creates new todos successfully
  - Validates required fields
  - Validates data types
  - Returns appropriate error messages

- **PUT /api/todos/:id**

  - Updates existing todos
  - Validates input data
  - Returns 404 for non-existent todos
  - Returns updated todos list

- **DELETE /api/todos/:id**

  - Deletes existing todos
  - Returns 404 for non-existent todos
  - Returns updated todos list

- **PATCH /api/todos/:id/mark**
  - Toggles todo completion status
  - Returns 404 for non-existent todos
  - Updates todo state correctly

### Frontend Tests

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

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/todo-app
```

### Frontend Setup

```bash
cd todo
npm install
```

## Running the Application

### Development Mode

1. Start MongoDB service
2. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```
3. Start the frontend development server:
   ```bash
   cd todo
   npm run dev
   ```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

## Running Tests

### Backend Tests

```bash
cd server
npm test
```

For watch mode:

```bash
npm run test:watch
```

### Frontend Tests

```bash
cd todo
npm test
```

For UI mode:

```bash
npm run test:ui
```

For coverage report:

```bash
npm run test:coverage
```

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the ISC License.
