import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Menu, X, User, ChevronDown } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="bg-blue-950 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold ml-5">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            CapitalRush
          </Link>
        </h1>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          className={`absolute gap-0 mr-10 md:gap-4 md:relative md:flex flex-col md:flex-row items-center bg-blue-950 md:bg-transparent w-full md:w-auto top-16 left-0 md:top-auto md:left-auto px-6 py-4 md:p-0 transition-transform duration-300 ${
            menuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          <Link
            to="/"
            className="block md:inline hover:text-gray-200 transition py-2 md:py-0"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {!user ? (
            <Link
              to="/login"
              className="block md:inline hover:text-gray-200 transition py-2 md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <div className="relative dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                className="flex items-center space-x-2 hover:text-gray-200 transition"
              >
                <User size={20} />
                <span>{user.email}</span>
                <ChevronDown size={18} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setMenuOpen(false);
                      setDropdownOpen(false);
                    }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
