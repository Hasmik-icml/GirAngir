import React from 'react';
import '../styles.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
}

export default function Button({ children, size = 'large', ...props }: ButtonProps){
    const sizeClasses = {
        small: 'py-2 px-3 text-xm w-auto',
        medium: 'py-3 px-4 text-sm w-auto',
        large: '',
    };
    return (
        <button className={`button ${sizeClasses[size]}`} {...props}>
            {children}
        </button>
    );
};