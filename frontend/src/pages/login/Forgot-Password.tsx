import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import FormField from '../../components/Form-Field';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleResetPassword = () => {
        console.log('Reset password email sent to:', email);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">GirAngir</h1>
                    <p className="text-gray-400 mb-6">Enter your email to reset your password</p>
                </div>
                <form className="space-y-4">
                    <FormField
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        value={email}
                        onChange={handleChange}
                        children={undefined}
                    />
                    <Button type='submit' onClick={handleResetPassword}>Reset Password</Button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-400">
                        Remember your password? <Link to="/login" className="text-indigo-500 hover:text-indigo-400">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}