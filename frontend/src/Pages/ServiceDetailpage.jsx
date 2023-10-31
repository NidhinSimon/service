import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { button } from "@material-tailwind/react";

import { Sidebar } from "primereact/sidebar";

import { Button } from "primereact/button";

import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import UserNav from "./UserNav";
import { addToCart } from "../slices/userSlice";
import { useAddCartMutation } from "../slices/backendSlice";

const ServiceDetail = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);

  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [available, setavailable] = useState([]);
  const [sidebar, setsidebar] = useState(false);
  const [selectedCoupon, setSelectedcoupon] = useState(null);
  const [total, setotal] = useState(0);

  const [add] = useAddCartMutation();

  const { userInfo } = useSelector((state) => state.user);

  const userid = userInfo.userExists._id;
  useEffect(() => {
    const storedCoupon = localStorage.getItem("selectedCoupon");
    if (storedCoupon) {
      setSelectedcoupon(JSON.parse(storedCoupon));
    }
  }, []);

  console.log(userid, ">>>>>>>>>>>>>");

  useEffect(() => {
    const coupon = async () => {
      const res = await axios.get("http://localhost:5000/admin/getcoupon");

      setavailable(res.data);
    };
    coupon();
  }, []);

  useEffect(() => {
    const cartfetch = async () => {
      const res = await axios.get(`http://localhost:5000/users/cart/${userid}`);
      setCart(res.data);
      console.log(res);
    };
    cartfetch();
  }, [userid]);

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

  const handleBook = async (service, userid) => {
    // dispatch(addToCart(service));
    const cartData = {
      name: service.title,
      price: service.price,
      serviceId: service._id,
    };
    const res = await add({ cartData, userid }).unwrap();
    setCart((prevCart) => [...prevCart, cartData]);
    Swal.fire({
      title: "Item Added to Cart",
      text: "Service has been added to the cart",
      icon: "success",
    });

    console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>");
  };

  const handleRemove = async (item) => {
    // dispatch(removeFromCart(item));

    await axios.delete(
      `http://localhost:5000/users/cart/${userid}/${item.serviceId}`
    );
    const updatedcart = cart.filter((i) => i.serviceId !== item.serviceId);
    setCart(updatedcart);
    Swal.fire({
      title: "Item Deleted",
      text: "Service Removed from the cart",
      icon: "success",
    });
  };

  const calculateCartTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const calculateDiscountedTotal = () => {
    if (selectedCoupon) {
      const discount = (selectedCoupon.discount / 100) * calculateCartTotal();
      return (calculateCartTotal() - discount).toFixed(2);
    }
    return calculateCartTotal().toFixed(2);
  };
  const closeSidebar = () => {
    setsidebar(false);
  };

  const handleCheckout = () => {
    const checkoutData = {
      total: selectedCoupon
        ? calculateDiscountedTotal()
        : calculateCartTotal().toFixed(2),
      cart,
      appliedCoupon: selectedCoupon,
    };

    navigate("/checkout", { state: checkoutData });
  };
  const [selectedSortingOption, setSelectedSortingOption] =
    useState("Low to High");

  const handleSortingOptionChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedSortingOption(selectedOption);
    // You can sort the services here based on the selectedOption and update the services state.
  };

  // Sort the services based on the selectedSortingOption
  const sortedServices = services.slice().sort((a, b) => {
    if (selectedSortingOption === "Low to High") {
      return a.price - b.price;
    } else if (selectedSortingOption === "High to Low") {
      return b.price - a.price;
    }
  });

  const [searchQuery, setSearchQuery] = useState("");

  const filterServices = (services, query) => {
    return services.filter((service) => {
      return service.title.toLowerCase().includes(query.toLowerCase());
    });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredServices = filterServices(sortedServices, searchQuery);

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
                  <a onClick={() => navigate("/home")}>Home</a>
                </li>
                <li>
                  <a>{category}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-5">
            <div className="bg-slate-100 w-full h-screen">
              <div className="bg-slate-100 w-4/6 h-24 flex justify-end z-10 b">
              <div className="form-control ">
                  <div className="input-group ">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearch}
                      placeholder="Search…"
                      className="input input-bordered "
                    />
                    <button className="btn btn-square bg-slate-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="filter-container ml-auto">
                  <label htmlFor="sortingOption">Sort by Price:</label>
                  <select
                    id="sortingOption"
                    value={selectedSortingOption}
                    onChange={handleSortingOptionChange}
                  >
                    <option value="Low to High">Low to High</option>
                    <option value="High to Low">High to Low</option>
                  </select>
                </div>
            

             
              </div>
              <div className="w-full h-screen">
                <div className="w-full h-full md:flex">
                  <div className="w-full  md:w-4/6 ">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-1   ">
                      {filteredServices.map((service) => (
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
                                onClick={() => handleBook(service, userid)}
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
                              <h1 className="text-lg">{item.name}</h1>

                              <p>{item.price}</p>
                              <button
                                onClick={() => handleRemove(item)}
                                className="bg-blue-400 w-20 rounded-lg text-white font-bold"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          {/* <div>
                            <Button onClick={handleCoupon}>
                              Apply coupoondd
                            </Button>
                            {sidebar && (
                              <Sidebarcoupon
                                sidebar={sidebar}
                                selectedCoupon={selectedCoupon}
                                setSelectedcoupon={setSelectedcoupon}
                                closeSidebar={closeSidebar}
                              />
                            )}
                            {selectedCoupon && (
                              <button
                                onClick={removeCoupon}
                                className="ml-4 text-2xl mb-2 text-orange-500"
                              >
                                X
                              </button>
                            )}
                          </div> */}

                          <div className="bg-indigo-500 text-white rounded-lg h-10 flex justify-between mt-2 ">
                            <p className="ml-3 mt-1">
                              Total: ₹
                              {selectedCoupon
                                ? calculateDiscountedTotal()
                                : calculateCartTotal().toFixed()}
                            </p>

                            <button onClick={handleCheckout} className="mr-3">
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
