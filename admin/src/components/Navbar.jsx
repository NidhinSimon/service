import React,{useState} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location=useLocation()
    const navigate=useNavigate()

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  return (
    <>
      <header className="bg-gradient-to-tr from-indigo-600 to-blue-500 dark:bg-zinc-800 text-white rounded-2xl ">
        <nav className="container px-6 py-1 mx-auto md:flex md:justify-between md:items-center p">
          <div className="flex items-center justify-between ">
            <a href="#">
              <img
                className="w-auto h-10 sm:h-14"
                src="https://imgs.search.brave.com/XFUL8QZF7KnfxN5ci6odfH2chnPwJKce8iAk9btO_zg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YnJhbmRpbmctaWRl/bnRpdHktY29ycG9y/YXRlLXZlY3Rvci1s/b2dvLWRlc2lnbl80/NjA4NDgtODcxNy5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw"
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
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-900  ${
              isOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full"
            } md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
            x-cloak
          >
            <div className="flex flex-col md:flex-row md:mx-6 ">
              <a
                className={location.pathname==="/users" ? 'my-2  transition-colors duration-300 transform dark:text-blue-500  md:mx-4 md:my-0' : 'my-2 text-white transition-colors duration-300 transform dark:text-gray-200  md:mx-4 md:my-0'

              } 
              onClick={()=>navigate('/users')}

                href="#"
              >
                USERS
              </a>
              <a
                className={location.pathname==="/ser" ? 'my-2  transition-colors duration-300 transform dark:text-blue-500  md:mx-4 md:my-0' : 'my-2 text-white transition-colors duration-300 transform dark:text-gray-200  md:mx-4 md:my-0'

              } 
                href="#"
                onClick={()=>navigate('/ser')}
              >
                SERVICES
              </a>
              <a
                // className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                href="#"
                className={location.pathname==="/categories" ? 'my-2  transition-colors duration-300 transform dark:text-blue-500  md:mx-4 md:my-0' : 'my-2 text-white transition-colors duration-300 transform dark:text-gray-200  md:mx-4 md:my-0'

                } 
                onClick={()=>navigate('/categories')}
              >
                CATEGORY
              </a>
              <a
                className={location.pathname==="/service" ? 'my-2  transition-colors duration-300 transform dark:text-blue-500  md:mx-4 md:my-0' : 'my-2 text-white transition-colors duration-300 transform dark:text-gray-200  md:mx-4 md:my-0'

              } 
                href="#"
                onClick={()=>navigate('/service')}
              >
               ADD SERVICE
              </a>
              <a
                className={location.pathname==="/add" ? 'my-2  transition-colors duration-300 transform dark:text-blue-500  md:mx-4 md:my-0' : 'my-2 text-white transition-colors duration-300 transform dark:text-gray-200 md:mx-4 md:my-0'

              } 
                href="#"
                onClick={()=>navigate('/add')}
              >
                ADD CATEGORY
              </a>
              <a
                className={location.pathname==="/requests" ? 'my-2  transition-colors duration-300 transform dark:text-blue-500  md:mx-4 md:my-0' : 'my-2 text-white transition-colors duration-300 transform   md:mx-4 md:my-0'

              } 
                href="#"
                onClick={()=>navigate('/requests')}
              >
                REQUESTS
              </a>
              <a
                className={location.pathname==="/providers" ? 'my-2  transition-colors duration-300 transform dark:text-blue-500  md:mx-4 md:my-0' : 'my-2 text-white transition-colors duration-300 transform   md:mx-4 md:my-0'

              } 
                href="#"
                onClick={()=>navigate('/providers')}
              >
                PROVIDERS
              </a>
             
            </div>

          </div>
        </nav>

        {/* <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                  Best place to Book <br /> your{" "}
                  <span className="text-blue-500 ">Services</span>
                </h1>

                <p className="mt-3 text-gray-600 dark:text-gray-400">
                 We offer a variety of services of household ,so sit back and let the professionals handle the work
                </p>

                <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  BOOK NOW
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-9/12 h-1/5 lg:max-w-3xl"
                src="https://res.cloudinary.com/dj8z6xx94/image/upload/v1694147834/cleaning_service-amico_1_xto0jf.png"
                alt="Catalogue-pana.svg"
              />
            </div>
          </div>
        </div> */}
      </header>
    </>
  )
}

export default Navbar
