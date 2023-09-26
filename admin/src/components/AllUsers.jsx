import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import BlockModal from "./Modals/BlockModal";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [unblock, setUserunblock] = useState(null);
  const [unblockModal, setUnblockModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleClick = (id) => {
    setModal(true);
    setUserId(id);
  };

  const handleUnblock = (id) => {
    setUnblockModal(true);
    setUserunblock(id);
  };

  const blockUser = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/admin/userblock/${userId}`
      );
      if (res.data.message === "user blocked successfully") {
        toast.success("user blocked successfully");
        const updated = users.map((user) =>
          user._id === userId ? { ...user, blocked: true } : user
        );
        setUsers(updated);
      }

      setModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const unblockUser = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/admin/userunblock/${unblock}`
      );
      setUnblockModal(false);
      if (res.data.message === "user unblocked successfully") {
        toast.success("user unblocked successfully");
        const updated = users.map((user) =>
          user._id === unblock ? { ...user, blocked: false } : user
        );

        
        setUsers(updated);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmUnblock = () => {
    setUnblockModal(false);
  };

  const confirmBlock = () => {
    setModal(false);
  };

  return (
    <>
      <Navbar />
      <Toaster />
      {unblockModal && (
        <BlockModal
          message="ARE YOU SURE YOU WANT TO UNBLOCK THE USER"
          onclose={confirmUnblock}
          confirm={unblockUser}
        />
      )}

      {modal && (
        <BlockModal
          message="ARE YOU SURE YOU WANT TO BLOCK THE USER"
          onclose={confirmBlock}
          confirm={blockUser}
        />
      )}
      <div className="flex-grow mt-10 w-full">
        <div className="text-center">
          <h1 className="text-lg">USERS</h1>
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg mt-6 bg-white text-gray-700  rounded-full ml-36  w-4/5 ">
          <table className="w-full text-sm text-left">
            <thead className="text-lg bg-gray-50 dark:bg-zinc-800 text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SERVICE NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  EMail
                </th>
                <th scope="col" className="px-6 py-3">
                  MOBILE
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-slate-200-800"
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {user.name}
                  </td>

                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.mobile}</td>
                  <td className="px-6 py-4">
                    {user.blocked ? (
                      <button
                        className="text-green-500 font-medium hover:underline"
                        onClick={() => handleUnblock(user._id)}
                      >
                        UNBLOCK
                      </button>
                    ) : (
                      <button
                        className="text-red-600 font-medium hover:underline"
                        onClick={() => handleClick(user._id)}
                      >
                        BLOCK
                      </button>
                    )}
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

export default AllUsers;
