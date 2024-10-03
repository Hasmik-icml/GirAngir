import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 flex flex-col items-center">
        <img src="/logo.png" alt="Logo" className="w-24 h-24 mb-4" />
      </div>
      <nav className="mt-10 flex-grow">
        <ul className="flex flex-col space-y-2">
          <li><Link to="/" className="px-4 py-2 hover:bg-gray-700">Dashboard</Link></li>
          {/* Ավելացրեք մյուս հղումները */}
        </ul>
      </nav>
    </aside>
  );
};