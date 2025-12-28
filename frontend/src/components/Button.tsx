import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    children,
    className = '',
    disabled,
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = size !== 'md' ? `btn-${size}` : '';

    const classes = [baseClass, variantClass, sizeClass, className]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            className={classes}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <span className="spinner"></span>}
            {children}
        </button>
    );
};

export default Button;
