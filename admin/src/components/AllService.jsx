import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { setCredentials } from "../../Redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEditServiceMutation } from "../../Redux/adminauth";
import ProviderModal from "../components/Modals/ProviderModal";

const AllService = () => {
  const [edit] = useEditServiceMutation();
  // const {adminInfo}=useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // const toggleModal = () => {
  //   setIsModalOpen(true);
  // };
  const [isOpen, setIsOpen] = useState(false);
  const [editservice, setEditServices] = useState(null);
  const [services, setServices] = useState([]);

  const handleEditClick = (i) => {
    setEditServices(i);
    setIsOpen(true);
  };

  const handleDelete = async (i) => {
    setItemToDelete(i);
    setModalOpen(true);
  };

  const confirmDelete = async (i) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/admin/services/${itemToDelete._id}`
      );
      console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      if (res.status === 200) {
        toast.success("service deleted succesffully");
        const updatedService = services.filter(
          (s) => s._id !== itemToDelete._id
        );
        setServices(updatedService);
        setModalOpen(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const services = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/services");
        console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        setServices(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    services();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/admin/editservice/${editservice._id}`,
        editservice
      );
      console.log(
        editservice,
        "#################################################"
      );
      console.log(res, "**************************************8");

      if (res.status === 200) {
        toast.success("success");
        const updatedService = services.map((i) =>
          i._id === res.data._id ? res.data : i
        );

        setServices(updatedService);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmclose = () => {
    setModalOpen(false);
  };

  // const handleSubmit=async()=>{

  //   try {
  //     const res=await edit({title,description}).unwrap()
  //     console.log(res,"res of redux")
  //     dispatch(setCredentials({...res}))
  //     toast.success("hello successfful edited")
  //     setIsOpen(false)
  //   } catch (error) {
  //     console.log(error.message)
  //   }

  // }

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row  ">
        <Toaster />

        <div className="relative flex justify-center">
          {/* <button
     
      className="px-6 py-2 mx-auto tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
    >
      Open Modal
    </button> */}
          <div className="relative flex justify-center items-center min-h-screen">
            {isModalOpen && (
              <ProviderModal
                message="Are You Sure You want to delete the service"
                confirm={confirmDelete}
                onclose={confirmclose}
              />
            )}
          </div>
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
                      SERVICE NAME
                    </label>

                    <label className="block mt-3" htmlFor="name">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={editservice?.title || ""}
                        onChange={(e) =>
                          setEditServices({
                            ...editservice,
                            title: e.target.value,
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
                        name="description"
                        id="description"
                        value={editservice?.description || ""}
                        onChange={(e) =>
                          setEditServices({
                            ...editservice,
                            description: e.target.value,
                          })
                        }
                        className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      />
                    </label>

                    <label
                      htmlFor="emails-list"
                      className="text-sm text-gray-700 dark:text-gray-200"
                    >
                      PRICE
                    </label>

                    <label className="block mt-3" htmlFor="name">
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={editservice?.price || ""}
                        onChange={(e) =>
                          setEditServices({
                            ...editservice,
                            price: e.target.value,
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
            <h1 className="text-lg">SERVICES LIST</h1>
          </div>

          <div className="overflow-x-auto shadow-md sm:rounded-lg mt-6 bg-white text-gray-700  rounded-full ml-36  w-4/5 ">
            <table className="w-full text-sm text-left ">
              <thead className="text-lg bg-zinc-700 dark:bg-zinc-800 text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    SERVICE NAME
                  </th>
                  <th scope="col" className="px-6 py-3">
                    IMAGE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DESCRIPTION
                  </th>

                  <th scope="col" className="px-6 py-3">
                    PRICE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CATEGORY
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((i) => (
                  <tr
                    key={i._id}
                    className="border-b hover:bg-gray-100 dark:hover:bg-slate-200-800"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {i.title}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={i.image}
                        alt={i.title}
                        className="w-32 h-16 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">{i.description}</td>
                    <td className="px-6 py-4">{i.price}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-red-600 font-medium hover:underline"
                        onClick={() => handleDelete(i)}
                      >
                        Delete
                      </button>
                      <button
                        className="text-blue-600 font-medium hover:underline ml-5"
                        onClick={() => handleEditClick(i)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">{i.category}</td>
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

export default AllService;
