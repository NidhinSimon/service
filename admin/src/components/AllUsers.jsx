import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import BlockModal from "./Modals/BlockModal";
import { Empty } from "antd";

const PAGE_SIZE = 1;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [unblock, setUserunblock] = useState(null);
  const [unblockModal, setUnblockModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const confirmUnblock = () => {
    setUnblockModal(false);
  };

  const confirmBlock = () => {
    setModal(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <>
      <Navbar />
      <Toaster />

      <div className="text-center mt-4">
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2"
        />
      </div>

      <div className="flex-grow mt-10 w-full">
        <div className="text-center">
          <h1 className="text-lg">USERS</h1>
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg mt-6 bg-white text-gray-700  rounded-full ml-36  w-4/5 ">
          <table className="w-full text-sm text-left">
            <thead className="text-md bg-gray-50 dark:bg-zinc-800 text-zinc-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Mobile
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.length === 0 ? (
                <>
                  <div className=" flex justify-center">
                    <Empty />
                  </div>
                </>
              ) : (
                <>
                  {displayedUsers.map((user) => (
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
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-2 py-1 mx-1 bg-blue-500 text-white rounded-md ${
                currentPage === index + 1 ? "bg-orange-400" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
