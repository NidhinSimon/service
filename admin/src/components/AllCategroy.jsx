import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

import axios from "axios";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleEditClick = (category) => {
    setEditCategory(category);
    setIsOpen(true);
  };



 


  useEffect(() => {
    const categories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/categories");
        console.log(
          res,
          "---------------------------------------------------------------------------------------------"
        );
        setCategories(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    categories();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/admin/editcategory/${editCategory._id}`,
        editCategory
      );

    
      if (res.status === 200) {
        toast.success("successfully updated the category");
        const updatedCategories = categories.map((category) =>
          category._id === res.data._id ? res.data : category
        );

        setCategories(updatedCategories);

        setIsOpen(false);
      } else {
        toast.error("something error occured");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col md:flex-row">
     
      <Toaster />
      <div className="relative flex justify-center">
        {/* <button
       
        className="px-6 py-2 mx-auto tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        Open Modal
      </button> */}

        {isOpen && (
          <div
            className="fixed inset-0 z-10 overflow-y-auto "
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <span
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle ">
                <h3
                  className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                  id="modal-title"
                >
                  EDIT Category
                </h3>

                <form className="mt-4" action="#">
                  <label
                    htmlFor="emails-list"
                    className="text-sm text-gray-700 dark:text-gray-200"
                  >
                    CATEGORY NAME
                  </label>

                  <label className="block mt-3" htmlFor="name">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={editCategory?.name || ""}
                      onChange={(e) =>
                        setEditCategory({
                          ...editCategory,
                          name: e.target.value,
                        })
                      }
                      className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    />
                  </label>
                  <label
                    htmlFor="emails-list"
                    className="text-sm text-gray-700 dark:text-gray-200"
                  >
                    LOCATION
                  </label>
                  <label className="block mt-3" htmlFor="location">
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={editCategory?.location || ""}
                      onChange={(e) =>
                        setEditCategory({
                          ...editCategory,
                          location: e.target.value,
                        })
                      }
                      className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    />
                  </label>

                  <button
                    type="button"
                    className="mt-2 flex items-center rounded py-1.5 px-2 text-sm text-blue-600 transition-colors duration-300 hover:text-blue-400 focus:outline-none dark:text-blue-400 dark:hover:text-blue-500"
                  ></button>

                  <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-grow mt-10 w-full">
        <div className="text-center">
          <h1 className="text-lg">Category LIST</h1>
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg mt-6 bg-white  text-slate-600 ">
          <table className="w-full text-sm text-left">
            <thead className="text-lg bg-zinc-900 dark:bg-zinc-800 text-white " >
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category._id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-slate-200-800"
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {category.name}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={category.categoryimage}
                      alt={category.name}
                      className="w-32 h-32 object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">{category.location}</td>
                  <td className="px-6 py-4">
                    {/* <button className="text-red-600 font-medium hover:underline">
                      Delete
                    </button> */}
                    <button
                      className="text-blue-600 font-medium hover:underline ml-5"
                      onClick={() => handleEditClick(category)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default AllCategory;
