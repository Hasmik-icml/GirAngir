import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import Button from "../../components/buttons/Button";
import { Link, useNavigate } from 'react-router-dom';
import FormField from "../../components/Form-Field";
import FormHeader from "../../components/Form-Header";
import '../../index.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [backendError, setBackendError] = useState('');
    const [isBackendError, setIsBackendError] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const history = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    const clearBackendError = () => {
        setBackendError('');
        setIsBackendError(false);
    }
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
        console.log("111", emailValidationError, passwordValidationError);
        setEmailError(emailValidationError);
        setPasswordError(passwordValidationError);

        if (rememberMe) {
            localStorage.setItem('email', email);
        } else {
            localStorage.removeItem('email');
        }

        const tryLogin = (email: string, password: string) => {
            return fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
        };

        const handleBackendError = async (response: Response) => {
            const errorData = await response.json();
            setBackendError(errorData.errors[0]?.message || "An error occurred.");
        };

        const proceedToDashboard = async (response: Response) => {
            const data = await response.json();
            localStorage.setItem("accessToken", data.accessToken);
            history("/dashboard");
        };

        try {
            const response = await tryLogin(email, password);

            if (!response.ok) {
                console.log("oops")
                handleBackendError(response);
            } else {
                proceedToDashboard(response);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('An error occurred. Please try again.');
        }
    };

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

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('email');
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
        }
    }, []);

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
                    <FormHeader title="GirAngir" subTitle="Learn, Write, Remember, Repeat" />
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <FormField
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="Enter your email" children={undefined}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <FormField
                            id="password"
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            required
                            placeholder="Enter your password" children={undefined}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <input type="checkbox" id="show-password" checked={showPassword} onChange={togglePasswordVisibility} className="mr-2" />
                                <label htmlFor="show-password" className="text-gray-400">Show password</label>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <input type="checkbox" id="remember" checked={rememberMe} onChange={handleRememberMe} className="mr-2" />
                                    <label htmlFor="remember" className="text-gray-400">Remember me</label>
                                </div>
                                <Link to="/forgot-password" className="text-indigo-500 hover:text-indigo-400">
                                    Forgot password?
                                </Link>
                            </div>
                            <Button type="submit">Log in</Button>
                            {(backendError || emailError || passwordError) && <p className="text-red-500 text-sm">{backendError || emailError || passwordError}</p>}
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