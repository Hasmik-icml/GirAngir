import Sidebar from "../../components/dashboard/Side-Bar";
import Vocabulary from "../../components/dashboard/Vocabulary";

export default function Dashboard() {
    return (
        <>
            <div className="flex flex-col sm:flex-row min-h-screen">
                <div className="w-full sm:w-64 bg-gray-800 text-white sm:min-h-screen">
                    <Sidebar />
                </div>
                <div className="flex-1 bg-gray-100 p-4 overflow-auto">
                    <Vocabulary />
                </div>
            </div>
        </>
    )
}

