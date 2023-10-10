import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CouponModal = ({ cancel, confirm }) => {
  const couponValidationSchema = yup.object().shape({
    couponName: yup.string().required("Coupon name is required"),
    discount: yup
      .number()
      .positive("Discount must be positive")
      .required("Discount is required"),
    expiryDate: yup
      .number()
      .required("Expires in (days) is required")
      .positive("Expires in (days) must be positive"),
  });

  const formik = useFormik({
    initialValues: {
      couponName: "",
      discount: "",
      expiryDate: "",
    },
    validationSchema: couponValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:5000/admin/coupon/add", {
          ...values,
        });
        if (res.data.message === "Coupon added successfully") {
          toast.success("Coupon added");
          cancel()
      
        
        }
      } catch (error) {
        console.error(error.message);
        toast.error("Failed to add coupon");
      }
    },
  });

  return (
    <div>
      <Toaster />
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full h-full md:w-2/6 md:h-5/6 lg:h-4/5">
          <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 md:mt-16 border">
            <div className="flex justify-center mx-auto">
              <h1 className="text-lg font-semibold">Add Coupon</h1>
            </div>

            <form onSubmit={formik.handleSubmit} className="mt-6">
              <div>
                <label htmlFor="couponName" className="block text-sm text-gray-800 dark:text-gray-200">
                  Coupon Name
                </label>
                <input
                  type="text"
                  name="couponName"
                  placeholder="Enter coupon name"
                  value={formik.values.couponName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                    formik.errors.couponName && formik.touched.couponName ? "border-red-500" : ""
                  } shadow-sm rounded-lg`}
                />
                {formik.errors.couponName && formik.touched.couponName && (
                  <div className="text-red-500 text-sm">{formik.errors.couponName}</div>
                )}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="discount" className="block text-sm text-gray-800 dark:text-gray-200">
                    Discount
                  </label>
                </div>

                <input
                  type="number" // Use number input for discount
                  name="discount"
                  placeholder="Enter discount"
                  value={formik.values.discount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                    formik.errors.discount && formik.touched.discount ? "border-red-500" : ""
                  } shadow-sm rounded-lg`}
                />

                {formik.errors.discount && formik.touched.discount && (
                  <div className="text-red-500">{formik.errors.discount}</div>
                )}
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="expiryDate" className="block text-sm text-gray-800 dark:text-gray-200">
                    Expires in (days)
                  </label>
                </div>

                <input
                  type="number" // Use number input for expiration date (days)
                  name="expiryDate"
                  placeholder="Enter expiration in days"
                  value={formik.values.expiryDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                    formik.errors.expiryDate && formik.touched.expiryDate ? "border-red-500" : ""
                  } shadow-sm rounded-lg`}
                />
                {formik.errors.expiryDate && formik.touched.expiryDate && (
                  <div className="text-red-500">{formik.errors.expiryDate}</div>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Add Coupon
                </button>
                <button
                  onClick={cancel}
                  className="w-full mt-5 px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Cancel
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

export default CouponModal;
