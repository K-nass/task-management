import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types';
import { tasksApi } from '../api/tasks';
import { useAuth } from '../hooks/useAuth';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Modal from '../components/Modal';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

const TasksPage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await tasksApi.getTasks();
            const taskData = Array.isArray(response) ? response : response.data;
            setTasks(taskData || []);
            setError('');
        } catch (err: any) {
            setError('Failed to load tasks. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (data: CreateTaskRequest | UpdateTaskRequest) => {
        try {
            await tasksApi.createTask(data as CreateTaskRequest);
            setIsCreateModalOpen(false);
            fetchTasks();
        } catch (err: any) {
            setError('Failed to create task. Please try again.');
        }
    };

    const handleUpdateTask = async (data: CreateTaskRequest | UpdateTaskRequest) => {
        if (!selectedTask) return;

        try {
            await tasksApi.updateTask(selectedTask.id, data as UpdateTaskRequest);
            setIsEditModalOpen(false);
            setSelectedTask(null);
            fetchTasks();
        } catch (err: any) {
            setError('Failed to update task. Please try again.');
        }
    };

    const handleDeleteTask = async () => {
        if (!selectedTask) return;

        try {
            setDeleteLoading(true);
            await tasksApi.deleteTask(selectedTask.id);
            setIsDeleteModalOpen(false);
            setSelectedTask(null);
            fetchTasks();
        } catch (err: any) {
            setError('Failed to delete task. Please try again.');
        } finally {
            setDeleteLoading(false);
        }
    };

    const openEditModal = (task: Task) => {
        setSelectedTask(task);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (id: number) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            setSelectedTask(task);
            setIsDeleteModalOpen(true);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <LoadingSpinner size="lg" />;
    }

    return (
        <div style={{ minHeight: '100vh', paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
            <div className="container">
                {/* Header */}
                <div className="flex justify-between items-center mb-xl" style={{
                    padding: 'var(--spacing-lg)',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: 'var(--spacing-2xl)'
                }}>
                    <div>
                        <h1 style={{ margin: 0, marginBottom: 'var(--spacing-xs)' }}>Task Manager</h1>
                        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                            Welcome back, {user?.name}!
                        </p>
                    </div>
                    <Button variant="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                {/* Create Task Button */}
                <div className="mb-xl">
                    <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
                        + Create New Task
                    </Button>
                </div>

                {/* Tasks Grid */}
                {tasks.length === 0 ? (
                    <div className="glass-card text-center" style={{ padding: 'var(--spacing-2xl)' }}>
                        <h3>No tasks yet</h3>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                            Create your first task to get started!
                        </p>
                        <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
                            Create Task
                        </Button>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: 'var(--spacing-lg)'
                    }}>
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={openEditModal}
                                onDelete={openDeleteModal}
                            />
                        ))}
                    </div>
                )}

                {/* Create Task Modal */}
                <Modal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    title="Create New Task"
                >
                    <TaskForm
                        onSubmit={handleCreateTask}
                        onCancel={() => setIsCreateModalOpen(false)}
                    />
                </Modal>

                {/* Edit Task Modal */}
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedTask(null);
                    }}
                    title="Edit Task"
                >
                    {selectedTask && (
                        <TaskForm
                            task={selectedTask}
                            onSubmit={handleUpdateTask}
                            onCancel={() => {
                                setIsEditModalOpen(false);
                                setSelectedTask(null);
                            }}
                        />
                    )}
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedTask(null);
                    }}
                    title="Delete Task"
                >
                    <div>
                        <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                            Are you sure you want to delete "{selectedTask?.title}"? This action cannot be undone.
                        </p>
                        <div className="flex gap-md">
                            <Button variant="danger" onClick={handleDeleteTask} loading={deleteLoading}>
                                Delete
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setSelectedTask(null);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default TasksPage;
