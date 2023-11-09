import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const res = await axios.post("http://localhost:7000/admin/logout");

    if (res.data.message === "Logged Out") {
      navigate("/login");
      localStorage.removeItem("adminInfo");

      toast.success("succesd fully sjjs");
    }
  };

  return (
    <nav
      className="bg-white shadow dark:bg-gray-800"
      x-data="{ isOpen: false }"
    >
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center">
          <div className="flex items-center justify-between">
            <a href="#">
              <img
                className="w-auto h-6 sm:h-10"
                src="/src/assets/final.png"
                alt="eee"
              />
            </a>
            <Toaster />

            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {isOpen ? (
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
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={`absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="flex flex-col text-gray-600 capitalize dark:text-gray-300 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
              <a
                onClick={() => navigate("/dash")}
                href="#"
                className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 ${
                  location.pathname === "/dash" ? "text-blue-500" : "text-black"
                } `}
              >
                DashBoard
              </a>
              <a
                href="#"
                className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 ${
                  location.pathname === "/users"
                    ? "text-blue-500"
                    : "text-black"
                } `}
              >
                Users
              </a>
              <a
                href="#"
                className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 ${
                  location.pathname === "/dash" ? "text-blue-500" : "text-black"
                } `}
              >
                Services
              </a>
              <a
                href="#"
                className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 ${
                  location.pathname === "/dash" ? "text-blue-500" : "text-black"
                } `}
              >
                Category
              </a>
              <a
                href="#"
                className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 ${
                  location.pathname === "/dash" ? "text-blue-500" : "text-black"
                } `}
              >
                Add Service
              </a>
              <a
                href="#"
                className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 ${
                  location.pathname === "/dash" ? "text-blue-500" : "text-black"
                } `}
              >
                Add Category
              </a>
              <a
                href="#"
                className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 ${
                  location.pathname === "/dash" ? "text-blue-500" : "text-black"
                } `}
              >
                Verifications
              </a>
              <a
                href="#"
                className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 ${
                  location.pathname === "/dash" ? "text-blue-500" : "text-black"
                } `}
              >
                Providers
              </a>
              <a
                href="#"
                className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 ${
                  location.pathname === "/dash" ? "text-blue-500" : "text-black"
                } `}
              >
                Coupon
              </a>
              <a
                href="#"
                className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 ${
                  location.pathname === "/dash" ? "text-blue-500" : "text-black"
                } `}
              >
                Reports
              </a>
            </div>
            <div className="flex justify-end items-center">
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400 ml-4"
                aria-label="logout"
              >
                <span className="mr-2">Logout</span>
                <img
                  className="w-8 h-6"
                  src="/src/assets/logout.png"
                  alt="eee"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
