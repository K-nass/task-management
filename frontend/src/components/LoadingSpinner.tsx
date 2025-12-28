import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
    const sizeClass = size === 'lg' ? 'spinner-lg' : '';

    return (
        <div className="loading-overlay">
            <div className={`spinner ${sizeClass}`}></div>
        </div>
    );
};

export default LoadingSpinner;
