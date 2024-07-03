import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleResetPassword = () => {
        console.log('Reset password email sent to:', email);
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">GirAngir</h1>
                    <h2 className="text-xl font-bold text-white mb-4">Forgot Password</h2>
                    <p className="text-gray-400 mb-6">Enter your email to reset your password</p>
                </div>
                <form>
                    <div className="mb-4">
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                        onClick={handleResetPassword}
                    >
                        Reset Password
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-400">
                        Remember your password?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
