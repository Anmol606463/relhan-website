import React, { useState } from "react";
import { Link } from "react-router-dom";
import relhan_logo from "../../assets/relhan_logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown, FaBars, FaTimes } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { useAuth } from "../../context/AuthContext";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About Us", link: "/about" },
  { id: 3, name: "Services", link: "/services" },
  { id: 4, name: "Catalog", link: "/catalog" },
  { id: 5, name: "Contact Us", link: "/contact" },
];

const DropdownLinks = [
  { id: 1, name: "Products", link: "/" },
  { id: 2, name: "Best Selling", link: "/" },
  { id: 3, name: "Top Rated", link: "/" },
];

const Navbar = ({ handleOrderPopup }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2 items-center">
              <img src={relhan_logo} alt="relhan_logo" className="w-10" />
              Relhan Innovation Pvt. Ltd.
            </Link>
          </div>

          {/* Mobile Menu Button */}
          {user && (
            <div className="sm:hidden flex items-center">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          )}

          {/* Right Side (desktop only) */}
          {user && (
            <div className="hidden sm:flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative group hidden sm:block">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border px-2 py-1 focus:outline-none dark:bg-gray-800"
                />
                <IoMdSearch className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 group-hover:text-primary" />
              </div>

              {/* Order Button */}
              <button
                onClick={handleOrderPopup}
                className="bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full flex items-center gap-3 group"
              >
                <span className="group-hover:block hidden">Order</span>
                <FaCartShopping className="text-xl drop-shadow-sm" />
              </button>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full"
              >
                Logout
              </button>

              <DarkMode />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      {user && (
        <>
          {/* Desktop */}
          <div className="justify-center hidden sm:flex">
            <ul className="flex items-center gap-4">
              {Menu.map((item) => (
                <li key={item.id}>
                  <Link to={item.link} className="inline-block px-4 hover:text-primary duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* Admin Link */}
              <li>
                <Link
                  to="/admin"
                  className="inline-block px-4 py-1 border border-orange-500 text-orange-600 rounded hover:bg-orange-50 duration-200 font-semibold"
                >
                  Admin
                </Link>
              </li>

              {/* Dropdown */}
              <li
                className="relative group cursor-pointer"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="flex items-center gap-[2px] py-2">
                  Trending Products
                  <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                </div>
                {dropdownOpen && (
                  <div className="absolute z-[9999] w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                    <ul>
                      {DropdownLinks.map((item) => (
                        <li key={item.id}>
                          <Link
                            to={item.link}
                            className="block w-full rounded-md p-2 hover:bg-primary/20"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="sm:hidden bg-white dark:bg-gray-800 px-4 pb-4">
              <ul className="flex flex-col gap-3 mt-2">
                {Menu.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.link}
                      className="block py-2 border-b border-gray-200 dark:border-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}

                {/* Admin Link */}
                <li>
                  <Link
                    to="/admin"
                    className="block py-2 border-b border-orange-500 text-orange-600 font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin
                  </Link>
                </li>

                {/* Dropdown (click to expand) */}
                <li>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex justify-between w-full py-2"
                  >
                    Trending Products
                    <FaCaretDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {dropdownOpen && (
                    <ul className="ml-4 mt-1 border-l border-gray-300 dark:border-gray-600">
                      {DropdownLinks.map((item) => (
                        <li key={item.id}>
                          <Link
                            to={item.link}
                            className="block py-1 hover:text-primary"
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Actions */}
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    onClick={handleOrderPopup}
                    className="bg-primary text-white px-4 py-2 rounded-full"
                  >
                    Order Now
                  </button>
                  <button
                    onClick={logout}
                    className="bg-secondary text-white px-4 py-2 rounded-full"
                  >
                    Logout
                  </button>
                  <DarkMode />
                </div>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
