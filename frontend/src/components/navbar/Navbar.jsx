import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600";

  return (
    <header className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-row items-center gap-20">
          <Link
            to="/"
            className="flex flex-row gap-1 text-2xl font-extrabold text-blue-700 tracking-wide hover:scale-105 transition-transform"
          >
            <img
              src="https://png.pngtree.com/png-clipart/20220603/original/pngtree-letter-n-logo-png-png-image_7902043.png"
              alt="logo"
              className="h-9 w-8 mr-2 backdrop-blur-3xl"
            />{" "}
            Notify<span className="text-gray-700">Hub</span>
          </Link>
          <Link
            to="/"
            className={`${isActive(
              "/home"
            )} text-1xl hover:text-blue-600 transition duration-200`}
          >
            Home
          </Link>
        </div>

        <nav className="hidden md:flex space-x-6 items-center">
          <Link
            to="/login"
            className={`${isActive(
              "/login"
            )} btn btn-neutral btn-outline text-blue-500 rounded-3xl hover:bg-white text-blue-500`}
          >
            Login
          </Link>

          <Link
            to="/register"
            className={`${isActive(
              "/register"
            )} btn btn-info rounded-3xl text-white bg-gradient-to-br from-[#0e7c91] to-[#012B38] text-white rounded-xl p-6 hover:shadow-md transition`}
          >
            Register
          </Link>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-6 pb-4">
          <Link
            to="/login"
            className={`${isActive("/login")} block hover:text-blue-600`}
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`${isActive("/register")} block hover:text-blue-600`}
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
