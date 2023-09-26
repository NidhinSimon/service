import React, { useState } from "react";
import Navbar from "./Navbar";
import Modal from "../components/USer/Modal";
import { input, useSelect } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../components/Features/cartSlice";
import UserNav from "./UserNav";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {
  const [mapmodal, setMapmodal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);

  const handleRemove = (item) => {
    console.log("ivde ethi");
    dispatch(removeFromCart(item));

    Swal.fire({
      title: "Item Deleted",
      text: "Service Removed from the cart",
      icon: "success",
    });
  };

  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleCLose = () => {
    setMapmodal(false);
  };

  return (
    <>
      <UserNav />
      <div className="bg-slate-100  mt-10 h-full w-full p-6 md:flex order-last">
        <div className="bg-slate-100 w-full  md:w-3/5 h-screen p-6 ">
          <div className="bg-white h-4/5 p-5">
            {/*   send detail to */}
            <div className="bg-blue-100 w-full rounded-lg  h-12 flex ">
              <div>
                <img
                  className="w-8 ml-2 mt-2"
                  src="https://res.cloudinary.com/dj8z6xx94/image/upload/v1695187253/book_1321791_a8ru2w.png"
                  alt="dd"
                />
              </div>
              <h1 className="mt-2 ml-2">Send Booking Details To </h1>
            </div>
            {/*   address */}
            <div className="bg-blue-100 h-24 w-full mt-5 rounded-lg flex ">
              <div>
                <img
                  className="w-10 mt-7 ml-2"
                  src="https://res.cloudinary.com/dj8z6xx94/image/upload/v1695187536/map_854878_jkyhvh.png"
                  alt="ddd"
                />
              </div>
              <h1 className="mt-8 ml-5 text-lg font-bold "> Address</h1>
              <div className="flex w-full mt-10    justify-center align-middle ">
                <button
                  onClick={() => setMapmodal(true)}
                  className="bg-indigo-600 text-white rounded-xl h-10 w-32 md:mr-16"
                >
                  Select Address
                </button>
              </div>
            </div>

            {/*   slot */}

            <div className="bg-blue-100 w-full h-20 mt-5 rounded-lg flex">
              <img
                className="w-10 ml-2 h-10 mt-5 "
                src="https://res.cloudinary.com/dj8z6xx94/image/upload/v1695191540/calendar_591576_bov7pa.png"
                alt="ddd"
              />
              <h1 className="ml-5 text-lg  mt-7">Slot</h1>

              <div className="flex justify-center w-full md:mr-16 mt-6">
                <button className="bg-indigo-600 text-white h-10 w-24 rounded-lg ">
                  Select Slot
                </button>
              </div>
            </div>
            <div className="bg-blue-100 h-24 w-full mt-5 rounded-xl border">
              <div className="  flex">
                <div>
                  <img
                    className="w-10 ml-2 mt-5"
                    src="https://res.cloudinary.com/dj8z6xx94/image/upload/v1695192304/wallet_583985_glftg4.png"
                    alt=""
                  />
                </div>
                <h1 className="mt-7  ml-2 text-lg w-32  ">Payment Mode</h1>
              </div>
              <div className="bg-purple-600 rounded-sm flex align-bottom  justify-center h-10 mt-1 w ">
                <h1 className="text-center mt-2 text-white">Pay 3000</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 h-auto w-full -mt-48  md:w-2/5 md:mt-10 p-6 ">
          <div className="bg-slate-100 h-auto border border-slate-300 ">
            <h1 className="text-center mt-2  text-2xl uppercase">cart</h1>

            {cart.map((item) => (
              <>
                <div className="bg-blue-300 h-20 mt-3  flex  justify-between ">
                  <p className="mt-4 ml-4">{item.title}</p>
                  <p className="mt-4 ml-4">{item.price}</p>
                  <button
                    onClick={() => handleRemove(item)}
                    className="h-10 bg-blue-100 rounded-lg w-24 mt-4 mr-3"
                  >
                    Remove
                  </button>
                </div>
              </>
            ))}
          </div>
          <div className="bg-purple-700 text-white h-10 w-full sticky bottom-0 flex  justify-center ">
            <h1 className="mt-2 ">PAY - {totalAmount}</h1>

            {mapmodal && (
              <>
                <Modal closemodal={handleCLose} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
