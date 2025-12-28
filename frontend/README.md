# Task Management Frontend

A modern React frontend for the Task Management API, built with Vite, TypeScript, and featuring a premium dark mode UI.

## Features

- **Authentication**: Login and registration with JWT token management
- **Task Management**: Full CRUD operations for tasks
- **Modern UI**: Dark mode with glassmorphism effects and smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Type Safety**: Built with TypeScript for better development experience
- **State Management**: React Context API for authentication state

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS Custom Properties** - Theming and design system

## Prerequisites

- Node.js (v14 or higher)
- Backend API running on `http://localhost:5000`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` if your backend API is on a different URL:
```
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

**Development mode:**
```bash
npm run dev
```

The application will start on `http://localhost:5173`

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   ├── axios.ts          # Axios instance with interceptors
│   │   ├── auth.ts           # Authentication API calls
│   │   └── tasks.ts          # Task API calls
│   ├── components/
│   │   ├── Button.tsx        # Reusable button component
│   │   ├── Input.tsx         # Reusable input component
│   │   ├── LoadingSpinner.tsx
│   │   ├── Modal.tsx         # Modal component
│   │   ├── ProtectedRoute.tsx # Route guard
│   │   ├── TaskCard.tsx      # Task display card
│   │   └── TaskForm.tsx      # Task create/edit form
│   ├── contexts/
│   │   └── AuthContext.tsx   # Authentication context
│   ├── hooks/
│   │   └── useAuth.ts        # Auth hook
│   ├── pages/
│   │   ├── LoginPage.tsx     # Login page
│   │   ├── RegisterPage.tsx  # Registration page
│   │   └── TasksPage.tsx     # Main tasks dashboard
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── .env.example              # Environment variables template
├── index.html                # HTML template
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Features Overview

### Authentication
- User registration with name, email, and password
- Login with email and password
- JWT token stored in localStorage
- Automatic token injection in API requests
- Protected routes that redirect to login

### Task Management
- View all tasks in a responsive grid
- Create new tasks with title, description, and status
- Edit existing tasks
- Delete tasks with confirmation
- Status badges (Pending, In Progress, Done)
- Real-time updates after CRUD operations

### UI/UX
- Dark mode with vibrant accent colors
- Glassmorphism card effects
- Smooth animations and transitions
- Loading states for all async operations
- Error handling with user-friendly messages
- Responsive design for all screen sizes
- Custom scrollbar styling

## API Integration

The frontend integrates with the backend API endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Design System

The application uses a comprehensive design system with:

- **Color Palette**: Dark mode optimized colors
- **Typography**: Inter font family with multiple weights
- **Spacing**: Consistent spacing scale
- **Border Radius**: Predefined radius values
- **Shadows**: Multiple shadow levels including glow effects
- **Animations**: Smooth transitions and keyframe animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
