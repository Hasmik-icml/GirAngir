// import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../index.css';
import FormHeader from '../../components/Form-Header';
import FormField from '../../components/Form-Field';
import Button from '../../components/buttons/Button';

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
          <FormHeader title='GirAngir' subTitle='Create your account to start building your own encyclopedia' />
          <form className="space-y-4">
            <FormField
              id="username"
              label='Username'
              name="username"
              type="username"
              autoComplete="username"
              required
              placeholder="Enter your name"
              children={undefined}
            />
            <FormField
              id="email"
              label='Email'
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              children={undefined}
            />
            <FormField
              id="password"
              label='Password'
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              children={undefined}
            />
            <div>
              <Button type="submit">Sign Up</Button>
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



