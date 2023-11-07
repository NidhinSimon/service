import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="bg-gradient-to-tr from-indigo-600 to-blue-500 dark:bg-zinc-800 text-white rounded-2xl">
        <nav className="container px-4 mx-auto md:flex md:justify-between md:items-center py-2">
          <div className="flex items-center justify-between">
            <a href="/">
              <img
                className="w-auto h-10 sm:h-12"
                src="https://imgs.search.brave.com/XFUL8QZF7KnfxN5ci6odfH2chnPwJKce8iAk9btO_zg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YnJhbmRpbmctaWRl/bnRpdHytY29ycG9yLXZlY3Rvci1s/b2dvLWRlc2lnbl80/NjA4NDgtODcxNy5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw"
                alt="Logo"
              />
            </a>

            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="Toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={`absolute inset-x-0 z-20 w-full px-4 py-2 transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 ${
              isOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full"
            } md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
            x-cloak
          >
            <div className="flex flex-col md:flex-row md:mx-6">
              <a
                className={`my-2 text-sm md:mx-4 md:my-0 ${
                  location.pathname === "/users"
                    ? "text-blue-500"
                    : "text-white"
                }`}
                onClick={() => navigate("/users")}
                href="#"
              >
                Users
              </a>
              <a
                className={`my-2 text-sm md:mx-4 md:my-0 ${
                  location.pathname === "/dash"
                    ? "text-blue-500"
                    : "text-white"
                }`}
                onClick={() => navigate("/dash")}
                href="#"
              >
                DashBoard
              </a>
              <a
                className={`my-2 text-sm md:mx-4 md:my-0 ${
                  location.pathname === "/ser" ? "text-blue-500" : "text-white"
                }`}
                onClick={() => navigate("/ser")}
                href="#"
              >
                SERVICES
              </a>
              <a
                className={`my-2 text-sm md:mx-4 md:my-0 ${
                  location.pathname === "/categories"
                    ? "text-blue-500"
                    : "text-white"
                }`}
                onClick={() => navigate("/categories")}
                href="#"
              >
                CATEGORY
              </a>
              <a
                className={`my-2 text-sm md:mx-4 md:my-0 ${
                  location.pathname === "/service"
                    ? "text-blue-500"
                    : "text-white"
                }`}
                onClick={() => navigate("/service")}
                href="#"
              >
                ADD SERVICE
              </a>
              <a
                className={`my-2 text-sm md:mx-4 md:my-0 ${
                  location.pathname === "/add" ? "text-blue-500" : "text-white"
                }`}
                onClick={() => navigate("/add")}
                href="#"
              >
                ADD CATEGORY
              </a>
              <a
                className={`my-2 text-sm md:mx-4 md:my-0 ${
                  location.pathname === "/requests"
                    ? "text-blue-500"
                    : "text-white"
                }`}
                onClick={() => navigate("/requests")}
                href="#"
              >
                REQUESTS
              </a>
              <a
                className={`my-2 text-sm md:mx-4 md:my-0 ${
                  location.pathname === "/providers"
                    ? "text-blue-500"
                    : "text-white"
                }`}
                onClick={() => navigate("/providers")}
                href="#"
              >
                PROVIDERS
              </a>
              <a
                className={`my-2 text-sm md:mx-4 md:my-0 ${
                  location.pathname === "/coupons"
                    ? "text-blue-500"
                    : "text-white"
                }`}
                onClick={() => navigate("/coupons")}
                href="#"
              >
                Coupon
              </a>
              <a
                className={`my-2 text-sm md:mx-4 md:my-0 ${
                  location.pathname === "/reports"
                    ? "text-blue-500"
                    : "text-white"
                }`}
                onClick={() => navigate("/reports")}
                href="#"
              >
                Reports
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
