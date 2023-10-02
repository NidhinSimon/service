import React from "react";

const EmpHome = () => {
  return (
    <>
      <nav className="bg-white shadow dark:bg-gray-800">
        <div className="container flex items-center justify-center p-6 mx-auto text-white capitalize bg-gradient-to-tr from-indigo-400 to-blue-500 rounded-2xl  ">
          <a
            href="#"
            className="text-gray-800 transition-colors duration-300 transform border-b-2 border-blue-500 mx-1.5 sm:mx-6"
          >
            Home
          </a>

          <a
            href="#"
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Services
          </a>

          <a
            href="#"
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Bookings
          </a>

          <a
            href="#"
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Requests
          </a>
          <a
            href="#"
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Profile
          </a>

          <a
            href="#"
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            <img
              className="w-5"
              src="https://res.cloudinary.com/dj8z6xx94/image/upload/v1695099995/notification-bell-svgrepo-com_qdvcgu.svg"
              alt=""
            />
          </a>
        </div>
      </nav>
    </>
  );
};

export default EmpHome;
