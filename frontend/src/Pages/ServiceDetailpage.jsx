import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { button } from "@material-tailwind/react";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../components/Features/cartSlice";
import Swal from "sweetalert2";
import UserNav from "./UserNav";
const ServiceDetail = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);

  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const servicesFetch = async () => {
      const res = await axios.get(`http://localhost:5000/users/services/${id}`);
      console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
      setServices(res.data);

      const response = await axios.get(
        `http://localhost:5000/users/categoryname/${id}`
      );
      console.log(response, "---------------------------------");
      setCategory(response.data.name);
    };

    servicesFetch();
  }, [id]);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const handleBook = (service) => {
    dispatch(addToCart(service));
  };

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleRemove = (item) => {
    dispatch(removeFromCart(item));

    Swal.fire({
      title: "Item Deleted",
      text: "Service Removed from the cart",
      icon: "success",
    });
  };

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <>
      <UserNav />
      <div className="">
        <div className="bg-slate-100  h-screen w-full">
          <div className="bg-gradient-to-tl from-blue-200 to-blue-400  border drop-shadow  w-full h-48">
            <h1 className=" flex justify-center  relative top-24 text-4xl text-white uppercase  ">
              {category} Services
            </h1>
            <div className="text-md breadcrumbs relative top-28 flex justify-center">
              <ul>
                <li>
                  <a>Home</a>
                </li>
                <li>
                  <a>{category}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-5">
            <div className="bg-slate-100 w-full h-screen">
              <div className="bg-slate-100 w-4/6 h-24 flex justify-end z-10">
                <div className="relative mt-5  inline-block text-left z-10 ">
                  <button
                    id="dropdownDefaultButton"
                    onClick={handleDropdownToggle}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Dropdown button{" "}
                    <svg
                      className="w-2.5 h-2.5 ml-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  <div
                    id="dropdown"
                    className={`${
                      isDropdownVisible ? "" : "hidden"
                    } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full h-screen">
                <div className="w-full h-full md:flex">
                  <div className="w-full  md:w-4/6 ">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-1   ">
                      {services.map((service) => (
                        <div
                          className="card card-side bg-base-100  md:h-auto lg:h-48 shadow-sm"
                          key={service.id}
                        >
                          <figure>
                            <img
                              className="w-32 h-32 bg-blue-300 ml-5 rounded-lg border"
                              src={service.image}
                              alt="Movie"
                            />
                          </figure>
                          <div className="card-body">
                            <h2 className="card-title ">{service.title}</h2>

                            {/* <button onClick={()=>setModal(true)} className='text-blue-600 rounded-lg  w-24 h-auto'>View details</button> */}

                            <p className="">{service.description}</p>
                            <p>{service.price}</p>

                            <div className="card-actions align-middle justify-end">
                              <button
                                className="btn btn-primary  text-white text-xs lg:w-28  sm:w-16 md:w-20   "
                                onClick={() => handleBook(service)}
                              >
                                BOOK NOW
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className=" w-full md:w-2/6 h-auto bg-slate-100 border p-2">
                    <h1 className="text-center text-lg font-bold ">CART</h1>
                    {cart.length === 0 ? (
                      <>
                        <div className="flex justify-center mt-5">
                          <img
                            className="mix-blend-darken w-3/6 "
                            src="/src/assets/EmptyCart.png"
                            alt="dd"
                          />
                        </div>
                        <h1 className="text-center text-lg font-mono">
                          No Items in Your Cart
                        </h1>
                      </>
                    ) : (
                      <>
                        <div className="bg-blue-200  rounded-xl w-auto h-auto ">
                          {cart.map((item) => (
                            <div className="flex justify-between p-2">
                              <h1 className="text-lg">{item.title}</h1>

                              <p>{item.price}</p>
                              <button
                                onClick={() => handleRemove(item)}
                                className="bg-blue-400 w-20 rounded-lg text-white font-bold"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <div className="bg-indigo-500 text-white rounded-lg h-10 flex justify-between mt-2 ">
                            <p className="ml-3 mt-1">₹{totalAmount}</p>
                            <button
                              onClick={() => navigate("/checkout")}
                              className="mr-3"
                            >
                              View Checkout
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
