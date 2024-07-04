// import { useState } from 'react';
// import { Link } from 'react-router-dom';
import Button from "../../components/buttons/Button";
import { Link } from 'react-router-dom';
import '../../index.css';
import FormField from "../../components/Form-Field";
import FormHeader from "../../components/Form-Header";

export default function Register() {
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
                    <FormHeader title="GirAngir" subTitle="Learn, Write, Remember, Repeat" />
                    <form className="space-y-4">
                    <FormField
                            id="password"
                            label="New password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="Enter new password" children={undefined}
                        />
                        <FormField
                            id="password"
                            label="Confirm password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="Confirm new password" children={undefined}
                        />
                        <div>
                            <div className="flex justify-between items-center mb-6">
                            </div>
                            <Link to="/login">
                            <Button type="submit">Reset</Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}