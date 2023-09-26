import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import ProviderModal from "./Modals/ProviderModal";

const AllProviders = () => {
  const [providers, setProviders] = useState([]);

  const [blockId, setBlockId] = useState(null);
  const [modal, setModal] = useState(false);
  const [unblock, setUnblockModal] = useState(false);

  useEffect(() => {
    const providers = async () => {
      const res = await axios.get("http://localhost:5000/allproviders");
      console.log(res, "?????????????????????????????????????????????");
      setProviders(res.data);
    };
    providers();
  }, []);

  const handleBLock = (id) => {
    console.log(id, ">>>>>>>>>>>...");
    setModal(true);

    setBlockId(id);
  };

  const handleunBLock = (id) => {
    setUnblockModal(true);
    setBlockId(id);
  };

  const confirmBlock = async () => {
    try {
      setModal(false);
      const res = await axios.put(`http://localhost:5000/block/${blockId}`);

      if (res.data.message === "provider blocked successfully") {
        toast.success("provider blocked successfully");

        const updatedBlock = providers.map((i) =>
          i._id === blockId ? { ...i, isBlocked: true } : i
        );
        setProviders(updatedBlock);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const confirmClose = () => {
    setModal(false);
  };

  const confirmUnblock = async () => {
    try {
      setUnblockModal(false);
      const res = await axios.put(`http://localhost:5000/unblock/${blockId}`);
      console.log(res);
      if (res.data.message === "user blocked sucessfully") {
        toast("User unblocked succesffully", {
          icon: "👏",
        });

        const updatedunblock = providers.map((i) =>
          i._id === blockId ? { ...i, isBlocked: false } : i
        );
        setProviders(updatedunblock);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const confirmcloseunblock = () => {
    setUnblockModal(false);
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="p-16">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-6 py-3">
                  PRofile
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  PROFESSION
                </th>

                <th scope="col" className="px-6 py-3">
                  AGE
                </th>
                <th scope="col" className="px-6 py-3">
                  MOBILE
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  license
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  CITY
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {providers.map((i) => (
                <tr
                  key={i._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
                >
                  <td className="">
                    <div className="flex items-center">
                      <img
                        className=" ml-3 w-28 h-28 rounded-full"
                        src={i.profileimage}
                        alt="ddgu"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{i.email}</td>
                  <td className="px-6 py-4">{}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="">{i.age}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="">{i.mobile}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="">{i.license}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="">{i.city}</div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {i.isBlocked ? (
                      <button
                        onClick={() => handleunBLock(i._id)}
                        className="w-16 h-8 bg-green-500 rounded-lg text-white"
                      >
                        UnBLock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBLock(i._id)}
                        className="w-16 h-8 bg-red-500 rounded-lg text-white"
                      >
                        BLock
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {/* Add more table rows here */}
            </tbody>
          </table>
        </div>
        {modal && (
          <ProviderModal
            message="Are You Sure You Want To Block the Provider"
            confirm={confirmBlock}
            onclose={confirmClose}
          />
        )}
        {unblock && (
          <ProviderModal
            message="Are You Sure You Want To Unblock The Provider"
            confirm={confirmUnblock}
            onclose={confirmcloseunblock}
          />
        )}
      </div>
    </>
  );
};

export default AllProviders;
