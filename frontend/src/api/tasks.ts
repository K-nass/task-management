import axiosInstance from './axios';
import type {
    CreateTaskRequest,
    UpdateTaskRequest,
    TaskResponse,
    TasksResponse,
} from '../types';

export const tasksApi = {
    // Get all tasks
    getTasks: async (): Promise<TasksResponse> => {
        const response = await axiosInstance.get<TasksResponse>('/tasks');
        return response.data;
    },

    // Create new task
    createTask: async (data: CreateTaskRequest): Promise<TaskResponse> => {
        const response = await axiosInstance.post<TaskResponse>('/tasks', data);
        return response.data;
    },

    // Update task
    updateTask: async (id: number, data: UpdateTaskRequest): Promise<TaskResponse> => {
        const response = await axiosInstance.put<TaskResponse>(`/tasks/${id}`, data);
        return response.data;
    },

    // Delete task
    deleteTask: async (id: number): Promise<{ success: boolean; data: {} }> => {
        const response = await axiosInstance.delete(`/tasks/${id}`);
        return response.data;
    },
};
