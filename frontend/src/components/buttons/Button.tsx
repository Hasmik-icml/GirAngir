import React from 'react';
import '../styles.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large' | 'fixed-medium';
    color?: 'gray' | 'red';
}

export default function Button({ children, size = 'large', color, ...props }: ButtonProps) {
    const sizeClasses = {
        small: 'py-2 px-3 text-xm w-auto',
        medium: 'py-2 px-4 text-sm w-auto',
        'fixed-medium': 'py-2 px-4 text-sm w-[200px]',
        large: '',
    };

    const colorClasses = {
        gray: 'bg-slate-600 text-white',
        red: 'bg-red-600 text-white',
    };

    return (
        <button
            className={`
        ${color === "red" ? "button-no-hover" : 'button'} 
        ${sizeClasses[size]} ${color ? colorClasses[color] : ''}`
            } {...props}>
            {children}
        </button>
    );
};