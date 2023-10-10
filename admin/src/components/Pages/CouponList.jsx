import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import CouponModal from "../Modals/CouponModal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import CouponEditModal from "../Modals/CouponEditModal";


function formatExpiresIn(days) {
  return `${days} day${days === 1 ? "" : "s"}`;
}

const CouponList = () => {
  const [couponadd, setcouponadd] = useState(false);
  const [coupon, setcoupon] = useState([]);
  const [editModal, seteditModal] = useState(false);
  const [id, setId] = useState("");

  const handleCouponAdd = () => {
    setcouponadd(true);
  };

  const handleclosemodal = () => {
    setcouponadd(false);
  };

  const handleconfirm = () => {

  };

  useEffect(() => {
    const getcoupon = async () => {
      const res = await axios.get("http://localhost:5000/admin/getcoupon");
      setcoupon(res.data);
    };
    getcoupon();
  }, []);

  const handleEdit = (id) => {
    seteditModal(true);
    setId(id);
  };

  const canceledit = () => {
    seteditModal(false);
  };

  const handleDelete=async(id)=>{
    console.log(id,">>>")
    const res=await axios.delete(`http://localhost:5000/admin/delete/${id}`)

    setcoupon((prevCoupon) => prevCoupon.filter((coupon) => coupon._id !== id));
    toast.success("Coupon deleted successfully");

  }

  return (
    <>
      <Navbar />
      {couponadd && <CouponModal cancel={handleclosemodal} confirm={handleconfirm}/>}
      {editModal && <CouponEditModal cancel={canceledit} id={id} handle={""} />}
      <Toaster />
      <div className="flex justify-end mt-3 h-10 mr-16">
        <Button
          onClick={handleCouponAdd}
          label="Add Coupon"
          severity="secondary"
          text
          raised
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Button>
      </div>
      <div className="flex justify-center">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 border border-b-lime-500 w-11/12">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-zinc-800">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Coupon Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Discount
                </th>
                <th scope="col" className="px-6 py-3">
                  Expires In
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {coupon.map((i) => (
                <tr
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={i._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i.couponName}
                  </th>
                  <td className="px-6 py-4">{i.discount}</td>
                  <td className="px-6 py-4">{formatExpiresIn(i.expiresIn)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(i._id)}
                      className="bg-indigo-600 w-14 h-7 rounded-lg text-white"
                    >
                      Edit
                    </button>
                    <button onClick={()=>handleDelete(i._id)} className="bg-red-500 text-white w-14 h-7 rounded-lg ml-3">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CouponList;
