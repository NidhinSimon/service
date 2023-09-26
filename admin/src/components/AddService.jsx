import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import * as yup from "yup";
import { useFormik } from "formik";
import Spinner from "./Spinner";

const AddService = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setServiceimage] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading,setLoading]=useState(false)

  const validationSchema=yup.object().shape({
    title:yup.string().typeError("name must be alphabet").required("name is required"),
    description:yup.string().required("description is required"),
    price:yup.number().positive("price must be postive").required('price is required'),
  category:yup.string().required("category is required")
      })

const formik=useFormik({
  initialValues:{
    title:"",
    description:"",
    category:"",
    price:""
  },
  validationSchema:validationSchema,
  onSubmit:async(value)=>{
    setLoading(true)
    try {
      const res = await axios.post("http://localhost:5000/admin/addservice", {
       ...value,image:image
      });
      console.log(res, ":::::::::::::::::::::::::::::::::::::::::::;;;;;");
      if (res.data.message === "Category added successfully") {
        toast.success("service added succesfullly");
        navigate("/ser");
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
})

  useEffect(() => {
    const categories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/categories");
        console.log(
          res,
          "--------------------------------------------------------"
        );
        setCategories(res.data);
      } catch (error) {
        console.log("error fetching catgeories", error.message);
      }
    };
    categories();
  }, []);



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result);
        setServiceimage(reader.result);
      };

      setServiceimage(file);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.post("http://localhost:5000/admin/addservice", {
  //       title,
  //       description,
  //       image,
  //       price,
  //       category,
  //     });
  //     console.log(res, ":::::::::::::::::::::::::::::::::::::::::::;;;;;");
  //     if (res.data.message === "Category added successfully") {
  //       toast.success("service added succesfullly");
  //       navigate("/ser");
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <>
      <Navbar />
      <div>
        <Toaster />
{
  loading && (
    <Spinner/>
  )
}
        <div>
          <main className="w-full h-screen flex flex-col items-center justify-center px-4  mt-16">
            <div className="max-w-sm w-full text-gray-600">
              <div className="text-center">
                <h1 className="text-2xl font-semibold">ADD SERVICE</h1>
              </div>
              <form onSubmit={formik.handleSubmit} encType='multipart/formData' className="mt-8 space-y-5">
                <div>
                  <label className="font-medium">Service NAME</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ' +
                      (formik.errors.title && formik.touched.title
                        ? 'border-red-500'
                        : 'focus:border-indigo-600') +
                      ' shadow-sm rounded-lg'
                    }
                  />
                  {formik.errors.title && formik.touched.title && (
                    <div className="text-red-500">{formik.errors.title}</div>
                  )}
                </div>
                <div>
                  <label className="font-medium">
                    Service Description (Enter in points)
                  </label>
                  <textarea
                    required
                    name="description"
                    value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            'w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ' +
            (formik.errors.description && formik.touched.description
              ? 'border-red-500'
              : 'focus:border-indigo-600') +
            ' shadow-sm rounded-lg'
          }
        />
        {formik.errors.description && formik.touched.description && (
          <div className="text-red-500">{formik.errors.description}</div>
        )}
      </div>
                <div>
                  <label className="font-medium">Category</label>
                  <select
                    required
                    name="category"
                    value={formik.values.category}
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   className={
                    'w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ' +
                    (formik.errors.location && formik.touched.location
                      ? 'border-red-500'
                      : 'focus:border-indigo-600') +
                    ' shadow-sm rounded-lg'
                  }>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.category && formik.touched.category && (
    <div className="text-red-500">{formik.errors.category}</div>
  )}
                </div>
                <div>
                  <label className="font-medium">UPLOAD IMAGE</label>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="rounded-full max-h-48 ml-28"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">Service price</label>
                  <input
                    type="number"
                    name="price"
                    required
                    value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            'w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ' +
            (formik.errors.price && formik.touched.price
              ? 'border-red-500'
              : 'focus:border-indigo-600') +
            ' shadow-sm rounded-lg'
          }
        />
        {formik.errors.price && formik.touched.price && (
          <div className="text-red-500">{formik.errors.price}</div>
        )}
      </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                  Submit
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AddService;
