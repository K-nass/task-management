// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Task Types
export type TaskStatus = 'pending' | 'in_progress' | 'done';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  user_id: number;
  created_at: string;
  createdAt: string;
  updatedAt: string;
}

// API Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

// API Response Types
export interface AuthResponse extends User {
  token?: string;
  success?: boolean;
}

export type TaskResponse = Task | {
  success?: boolean;
  data: Task;
};

export type TasksResponse = Task[] | {
  success?: boolean;
  count?: number;
  data: Task[];
};

export interface ErrorResponse {
  success: false;
  error: string;
}

export interface UserResponse extends User {
  success?: boolean;
}
