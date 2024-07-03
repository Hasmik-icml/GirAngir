import React from 'react';
import '../styles.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps){
    return (
        <button className="button" {...props}>
            {children}
        </button>
    );
};