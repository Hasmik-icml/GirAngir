import React from 'react';
import '../styles.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    color?: 'gray';
}

export default function Button({ children, size = 'large', color, ...props }: ButtonProps) {
    const sizeClasses = {
        small: 'py-2 px-3 text-xm w-auto',
        medium: 'py-3 px-4 text-sm w-auto',
        large: '',
    };

    const colorClasses = {
        gray: 'bg-slate-600 text-white',
    };

    return (
        <button className={`button ${sizeClasses[size]} ${color ? colorClasses[color] : ''}`} {...props}>
            {children}
        </button>
    );
};