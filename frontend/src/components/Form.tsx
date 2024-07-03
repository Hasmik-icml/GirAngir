import React from 'react';
import './styles.css';

interface FormFieldProps extends React.AllHTMLAttributes<HTMLInputElement> {
    children: React.ReactNode;
}

export default function FormField({ ...props }: FormFieldProps) {
    return (
        <div>
            <label htmlFor={props.id} className="label">{props.label}</label>
            <input
                className="input"
                {...props}
            />
        </div>
    )
}