import React from 'react';
import type { Task } from '../types';
import Button from './Button';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
    const getStatusBadgeClass = (status: string) => {
        return `badge badge-${status}`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="glass-card">
            <div className="flex justify-between items-center mb-md">
                <h3 style={{ margin: 0 }}>{task.title}</h3>
                <span className={getStatusBadgeClass(task.status)}>
                    {task.status.replace('_', ' ')}
                </span>
            </div>

            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                {task.description}
            </p>

            <div style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-md)'
            }}>
                Created: {formatDate(task.created_at)}
            </div>

            <div className="flex gap-sm">
                <Button size="sm" variant="secondary" onClick={() => onEdit(task)}>
                    Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(task.id)}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default TaskCard;
