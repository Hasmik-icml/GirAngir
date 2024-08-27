// import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';
import FormHeader from '../../components/Form-Header';
import FormField from '../../components/Form-Field';
import Button from '../../components/buttons/Button';
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email: string): string => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email) ? '' : 'Invalid email or password';
  };

  const validatePassword = (password: string): string => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number';
    }
    return '';
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError && passwordValidationError) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3010/auth/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })

      });

      if (!response) {
        throw new Error('Network response was not ok');
      }

      const data = response;
      console.log("data", data);

      if (data.ok) {
        history('/dashboard');
      } else {
        setEmailError('Invalid email or password');
        setPasswordError('Invalid email or password');
      }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('An error occurred. Please try again.');
    }
  };
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              id="username"
              label='Username'
              name="username"
              type="username"
              autoComplete="username"
              required
              placeholder="Enter your name"
              children={undefined}
              onChange={handleNameChange}
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
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
            />
            <div>
              <Button type="submit">Sign Up</Button>
              {(emailError || passwordError) && <p className="text-red-500 text-sm">{emailError}</p>}
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



