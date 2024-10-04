// import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import FormHeader from '../../components/Form-Header';
import FormField from '../../components/Form-Field';
import Button from '../../components/buttons/Button';
import { useState, useEffect } from 'react';
import '../../index.css';
import { validateEmail, validateName, validatePassword } from '../../utils/validation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [backendError, setBackendError] = useState('');
  const [isBackendError, setIsBackendError] = useState(false);

  const history = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const clearBackendError = () => {
    setBackendError('');
    setIsBackendError(false);
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (nameError) setNameError('');
    clearBackendError();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
    clearBackendError();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
    clearBackendError();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsBackendError(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })

      });
      console.log(333, response);
      if (!response.ok) {
        const errorData = await response.json();
        setBackendError(errorData.errors[0].message);
        setIsBackendError(true);
        throw new Error(errorData.errors[0].message);
      }

      const data = await response.json();;
      console.log("data", data);

      if (data) {
        history('/login');
      }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);

      setBackendError(String(errorMessage));
      setIsBackendError(true);
    }
  };

  useEffect(() => {
    if (!isBackendError) {
      const nameValidationError = validateName(name);

      if (name === '') {
        setNameError('');
      } else {
        setNameError(nameValidationError);
      }
    }
  }, [name, isBackendError]);

  useEffect(() => {
    if (!isBackendError) {
      const emailValidationError = validateEmail(email);

      if (email === '') {
        setEmailError('');
      } else {
        setEmailError(emailValidationError);
      }
    }
  }, [email, isBackendError]);

  useEffect(() => {
    if (!isBackendError) {
      const passwordValidationError = validatePassword(password);

      if (password === '') {
        setPasswordError('');
      } else {
        setPasswordError(passwordValidationError);
      }
    }
  }, [password, isBackendError]);

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
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              children={undefined}
              onChange={handlePasswordChange}
            />
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input type="checkbox" id="show-password" checked={showPassword} onChange={togglePasswordVisibility} className="mr-2" />
                <label htmlFor="show-password" className="text-gray-400">Show password</label>
              </div>
            </div>
            <div>
              <Button type="submit">Sign Up</Button>
              {(backendError || nameError || emailError || passwordError) && <p className="text-red-500 text-sm">{backendError || nameError || emailError || passwordError}</p>}
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



