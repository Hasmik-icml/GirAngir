// import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../index.css';

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
            <p className="text-gray-400 mt-2">Create your account to start building your own encyclopedia</p>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                className="mt-1 p-3 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 p-3 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 p-3 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account? <Link to="/login" className="text-indigo-500 hover:text-indigo-400">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}



