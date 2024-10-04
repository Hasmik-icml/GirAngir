import { Link } from "react-router-dom";
import Button from "../../components/buttons/Button";

export default function Welcome() {
    return (
        <>
            <div className="absolute top-6 right-6 space-x-4">
                <Button size="medium"><Link to="/login">Log in</Link></Button>
                <Button size="medium"><Link to="/register">Register</Link></Button>
            </div>
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <img src="/girangir.png" alt="Logo" className="mb-4" style={{ width: '400px', height: '400px' }} />
                <h1 className="text-4xl font-bold mb-4 animate-bounce text-gray-500">Welcome</h1>
                <p className="text-lg text-gray-400">GirAngir</p>
            </div>
        </>
    )
}