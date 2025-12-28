import React, { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    className = '',
    id,
    ...props
}) => {
    const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className="input-group">
            {label && (
                <label htmlFor={inputId} className="input-label">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`input-field ${className}`}
                {...props}
            />
            {error && <div className="input-error">{error}</div>}
        </div>
    );
};

export default Input;
