// import { useState } from 'react';
// import { Link } from 'react-router-dom';
import Button from "../../components/buttons/Button";
import { Link } from 'react-router-dom';
import '../../index.css';
import FormField from "../../components/Form";

export default function Register() {
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setpassword] = useState('');

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="relative bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-8">
                    <div className="absolute top-4 left-4 w-16 h-16 rounded-full overflow-hidden">
                        {/* <img src="image1-url" alt="Image 1" /> */}
                    </div>
                    <div className="absolute top-4 right-4 w-16 h-16 rounded-full overflow-hidden">
                        {/* <img src="image2-url" alt="Image 2" /> */}
                    </div>
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-white">GirAngir</h1>
                        <p className="text-gray-400 mt-2">Learn, Write, Remember, Repeat</p>
                    </div>
                    <form className="space-y-4">
                        <FormField
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="Enter your email" children={undefined}>
                        </FormField>
                        <FormField
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="Enter your password" children={undefined}>

                        </FormField>
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <input type="checkbox" id="remember" className="mr-2" />
                                    <label htmlFor="remember" className="text-gray-400">Remember me</label>
                                </div>
                                <Link to="/forgot-password" className="text-indigo-500 hover:text-indigo-400">
                                    Forgot password?
                                </Link>
                            </div>
                            <Button type="submit">Log in</Button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Don't have an account? <Link to="/register" className="text-indigo-500 hover:text-indigo-400">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}