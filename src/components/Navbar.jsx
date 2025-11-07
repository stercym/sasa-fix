// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex items-center justify-between">
      {/* Logo / Brand */}
      <div className="text-2xl font-bold text-blue-600 whitespace-nowrap">
        <Link to="/">SasaFix</Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8 whitespace-nowrap">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          About
        </Link>
        <Link
          to="/login"
          className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
