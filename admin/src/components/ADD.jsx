import React, { useState,useEffect } from 'react';
import axios from 'axios';
import toast ,{Toaster} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar';
import * as yup from "yup";
import { useFormik } from "formik";
import Spinner from './Spinner';
import AdminNav from './AdminNav/AdminNav';

const ADD = () => {
  const [name, setName] = useState('');
  const [categoryimage, setCategoryimage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [location, setLocation] = useState('');
  const [locations] = useState(['BANGLORE','PUNE','MUMBAI']); 
  const [existingCategories, setExistingCategories] = useState([]);
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate()

  const validationSchema=yup.object().shape({
    name:yup.string().typeError("catgeory must be a name").required("category name is required "),
    location:yup.string().required("location is required")
  })

  const formik=useFormik({
    initialValues:{
      name:"",
      location:""
    },
    validationSchema:validationSchema,
    onSubmit:async(value)=>{
      setLoading(true)
      try {
        const categoryExists = existingCategories.some(
          (existingCategory) =>
            existingCategory.name === name && existingCategory.location === location
        );
    
        if (categoryExists) {
          toast.error('Category already exists');
          return;
        }else
        {
          const res = await axios.post('http://localhost:5000/admin/add', {
          ...value,categoryimage:categoryimage
          });
          if(res.data.message==='Category added successfully')
          {
            toast.success("CATEGORY ADDED SUCCESSFULLY")
            navigate('/categories')
          }else
          {
            toast.error("some erro occured")
          }
        }
       
      }catch (error) {
        console.error('Error adding category:', error);
        toast.error('Failed to add category');
      } finally {
       
        setLoading(false);
      }
    }
  })

  useEffect(() => {
  
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/admin/categories'
        );
        setExistingCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result);
        setCategoryimage(reader.result);
      };

      setCategoryimage(file);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

   
  // };

  return (
    <>
   <AdminNav/>
    <div>
      <main className="w-full h-screen flex flex-col items-center justify-center px-4">
        <Toaster/>
        {
          loading && (
            <>
                <Spinner/>
            </>
        
          )
        }
        <div className="max-w-sm w-full text-gray-600">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Add Category</h1>
          </div>
          <form onSubmit={formik.handleSubmit } encType='multipart/formData' className="mt-8 space-y-5">
            <div>
              <label className="font-medium">CATEGORY NAME</label>
              <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            'w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ' +
            (formik.errors.name && formik.touched.name
              ? 'border-red-500'
              : 'focus:border-indigo-600') +
            ' shadow-sm rounded-lg'
          }
        />
        {formik.errors.name && formik.touched.name && (
          <div className="text-red-500">{formik.errors.name}</div>
        )}
      </div>
            <div>
              <label className="font-medium">LOCATION</label>
              <select
    required
    name="location"
    value={formik.values.location}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className={
      'w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border ' +
      (formik.errors.location && formik.touched.location
        ? 'border-red-500'
        : 'focus:border-indigo-600') +
      ' shadow-sm rounded-lg'
    }
  >
    <option value="">Select Location</option>
    {locations.map((loc) => (
      <option key={loc} value={loc}>
        {loc}
      </option>
    ))}
  </select>
  {formik.errors.location && formik.touched.location && (
    <div className="text-red-500">{formik.errors.location}</div>
  )}
</div>
            <div>
              <label className="font-medium">UPLOAD IMAGE</label>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className='rounded-full max-h-48 ml-28'
             
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
    </>
  );
};

export default ADD;
