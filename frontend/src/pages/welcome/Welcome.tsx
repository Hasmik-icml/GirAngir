import { Link } from "react-router-dom";
import Button from "../../components/buttons/Button";

export default function Welcome() {
    return (
        <>
            <div className="absolute top-6 right-6 space-x-4">
                <Button size="medium"><Link to="/login">Log in</Link></Button>
                <Button size="medium"><Link to="/register">Register</Link></Button>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900">
                <img src="/girangir.png" alt="Logo" className="mb-4" style={{ width: '15vw', height: '15vw' }} />
                <div className="flex flex-col md:flex-row items-center text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-bounce text-gray-500">Welcome</h1>
                    <p className="text-lg md:text-xl text-gray-400">GirAngir</p>
                </div>
            </div>
        </>
    )
}