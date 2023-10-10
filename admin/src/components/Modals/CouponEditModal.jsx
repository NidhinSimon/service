import React from "react";
import { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

const CouponEditModal = ({ id, cancel, confirm ,handle}) => {
  const [hello, sethello] = useState({});


  useEffect(() => {
    console.log(id, ">>>>>>>>>");
    const couponget = async () => {
      const res = await axios.get(
        `http://localhost:5000/admin/coupon/get/${id}`
      );
      console.log(res);
      sethello(res.data);
    };
    couponget();
  }, [id]);

  useEffect(() => {
    formik.setFieldValue("couponName", hello.couponName);
    formik.setFieldValue("discount", hello.discount);
    formik.setFieldValue("expiryDate", hello.expiresIn);
  }, [hello]);

  const couponvalidationSchema = yup.object().shape({
    couponName: yup.string().required("coupon name is required"),
    discount: yup
      .number()
      .positive("it must be postive")
      .required("discount is required"),
    expiryDate: yup
      .number()
      .required("date is required")
      .positive("it must be postive"),
  });

  const formik = useFormik({
    initialValues: {
      couponName: "",
      discount: "",
      expiryDate: "",
    },
    validationSchema: couponvalidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.put(
          `http://localhost:5000/admin/edit/${id}`,
          {
            ...values,
          }
        );
        if (res.data.message === "coupon added successfully") {
          toast.success("coupon added");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <div>
      <Toaster />
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full h-full md:w-2/6 md:h-5/6 lg:h-4/5  ">
          <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800   md:mt-16 border">
            <div className="flex justify-center mx-auto ">
              <h1 className="text-lg font-semibold">Edit Coupon</h1>
            </div>

            <form onSubmit={formik.handleSubmit} className="mt-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  CouponName
                </label>
                <input
                  type="text"
                  name="couponName"
                  value={formik.values.couponName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    `block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40` +
                    (formik.errors.couponName && formik.touched.couponName
                      ? `border-red-500`
                      : ``) +
                    "shadow-sm rounded-lg"
                  }
                />
                {formik.errors.couponName && formik.touched.couponName && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.couponName}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Discount
                  </label>
                </div>

                <input
                  type="text"
                  name="discount"
                  value={formik.values.discount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    `block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40` +
                    (formik.errors.discount && formik.touched.discount
                      ? `border-red-500`
                      : ``) +
                    "shadow-sm rounded-lg"
                  }
                />

                {formik.errors.discount && formik.touched.discount && (
                  <div className="text-red-500">{formik.errors.discount}</div>
                )}
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Expires in
                  </label>
                </div>

                <input
                  type="text"
                  name="expiryDate"
                  value={formik.values.expiryDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    `block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40` +
                    (formik.errors.expiryDate && formik.touched.expiryDate
                      ? `border-red-500`
                      : ``)
                  }
                />
                {formik.errors.expiryDate && formik.touched.expiryDate && (
                  <div className="text-red-500">{formik.errors.expiryDate}</div>
                )}
              </div>

              <div className="mt-6">
                <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Update Coupon
                </button>
                <button
                  onClick={cancel}
                  className="w-full mt-5 px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  cancel
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponEditModal;
