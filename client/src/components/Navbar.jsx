import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-400 transition">Employee Management AI</Link>
        </h1>

        {/* Links */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700 transition font-medium">
            Dashboard
          </Link>
          <Link to="/add" className="bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700 transition font-medium">
            Add Employee
          </Link>
          <Link to="/ai-match" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition font-bold shadow-lg">
             ✨ AI Matcher
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;