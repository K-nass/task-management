import React, { useState } from 'react';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types';
import Button from './Button';
import Input from './Input';

interface TaskFormProps {
    task?: Task;
    onSubmit: (data: CreateTaskRequest | UpdateTaskRequest) => Promise<void>;
    onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'pending' as const,
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter task title"
                error={errors.title}
            />

            <div className="input-group">
                <label htmlFor="description" className="input-label">
                    Description
                </label>
                <textarea
                    id="description"
                    className="input-field"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter task description"
                    rows={4}
                />
                {errors.description && <div className="input-error">{errors.description}</div>}
            </div>

            <div className="input-group">
                <label htmlFor="status" className="input-label">
                    Status
                </label>
                <select
                    id="status"
                    className="input-field"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>

            <div className="flex gap-md" style={{ marginTop: 'var(--spacing-xl)' }}>
                <Button type="submit" variant="primary" loading={loading}>
                    {task ? 'Update Task' : 'Create Task'}
                </Button>
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default TaskForm;
