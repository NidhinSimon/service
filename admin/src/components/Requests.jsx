import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./Navbar";
import { Image } from "primereact/image";

import toast, { Toaster } from "react-hot-toast";
import Modal from "./Modals/Modal";
import { Empty } from "antd";

const Requests = () => {
  const [providers, setProvider] = useState([]);
  const [visible, setVisible] = useState(false);
  const [emp, setEmp] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deletemodal, setDeletemodal] = useState(false);

  useEffect(() => {
    const providers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/providers");
        setProvider(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    providers();
  }, []);

  const confirm = async () => {
    setVisible(false);
    try {
      console.log("hello");
      const res = await axios.put(
        `http://localhost:5000/provider/verify/${emp}`
      );
      const up = providers.filter((i) => i._id !== emp);
      setProvider(up);
      if (res.data.message === "provider verified successfully") {
        toast.success("provider verified successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteConfirm = async () => {
    const res = await axios.delete(
      `http://localhost:5000/provider/reject/${itemToDelete}`
    );
    console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    const deletedProvider = providers.filter((i) => i._id !== itemToDelete);
    setDeletemodal(false);
    setProvider(deletedProvider);
    if (res.data.message === "provider rejected") {
      toast.success("provider Rejected Successfully");
    }
  };

  const handleDelete = (id) => {
    setDeletemodal(true);
    console.log(
      id,
      "/////////////////////////////////////////////////////////////////"
    );
    setItemToDelete(id);
  };

  const closeReject = () => {
    setDeletemodal(false);
  };

  const closeAccept = () => {
    setVisible(false);
  };

  const handleVerify = async (id) => {
    setEmp(id);
    setVisible(true);
  };

  return (
    <>
      <Navbar />

      <Toaster />
      {visible && (
        <Modal
          title="hello"
          message="ARE YOU SURE YOU WANT TO  ACCEPT THE PROVIDER"
          confirm={confirm}
          onClose={closeAccept}
        />
      )}

      {deletemodal && (
        <>
          <Modal
            title="hello"
            message="ARE you sure you want to reject the provider "
            confirm={deleteConfirm}
            onClose={closeReject}
          />
        </>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10  lg:max-w-7xl ml-28 ">
        {providers.length === 0 ? (
          <>
            <Empty />
          </>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-100 dark:text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  License Image
                </th>
                <th scope="col" className="px-6 py-3">
                  profile image
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  profession
                </th>
                <th scope="col" className="px-6 py-3">
                  CIty
                </th>
                <th scope="col" className="px-6 py-3">
                  View More details
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {providers.map((i) => (
                <tr
                  key={i._id}
                  className="bg-white  dark:bg-slate-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-cyan-50"
                >
                  <td className="w-32 p-4">
                    <div className="card flex justify-content-center">
                      <Image
                        className="flex justify-center hover:bg-cyan-100"
                        src={i.profileimage}
                        alt="Image"
                        width="200"
                        preview
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                    {i.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <h1>{i.age}</h1>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {i.mobile}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    View more details
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-green-500 hover:underline "
                      onClick={() => handleVerify(i._id)}
                    >
                      Accept
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 hover:underline ml-5"
                      onClick={() => handleDelete(i._id)}
                    >
                      Reject
                    </a>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    <div className="card flex justify-content-center">
                      <Image
                        className="flex justify-center hover:bg-cyan-100"
                        src={i.licenseimage}
                        alt="Image"
                        width="200"
                        preview
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Requests;
