import React, { useState, useEffect } from "react";
import Navbar from "../../Pages/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import UserNav from "../../Pages/UserNav";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Modal from "react-modal";
import io from "socket.io-client";
import Chat from "./USerModal/Chat";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("accepted");
  const [isChatModalOpen, setChatModalOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo.userExists._id;

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setreportReason] = useState("");
  const [providerIdToReport, setProviderIdToReport] = useState("");

  const socket = io("http://localhost:5000");
  const handleReport = (providerId) => {
    console.log("sisisiusiui");
    setProviderIdToReport(providerId);
    setReportModalOpen(true);
  };

  // Function to close the chat modal
  const closeChatModal = () => {
    setChatModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/bookings/${userId}`
      );
      console.log(response, ">>>>");
      if (response.status === 200) {
        setBookings(response.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterBookings = (status) => {
    if (status === "all") {
      return bookings;
    } else {
      return bookings.filter(
        (booking) => booking.status.toLowerCase() === status.toLowerCase()
      );
    }
  };

  const handleCancel = async (id) => {
    console.log(id, ">>");
    const res = await axios.post(
      `http://localhost:5000/users/canceluser/${id}`
    );
    console.log(res, ">>.");

    if (res.data.success) {
      toast.success("cancellled successfully");
    }
    console.log(res, ">>>>>>>>>>>>>");
  };

  const submitReport = async () => {
    console.log("djdgjdgj");
    try {
      const response = await axios.post(
        `http://localhost:5000/users/reportProvider/${providerIdToReport}`,
        {
          reportReason,
          userId,
        }
      );

      console.log(response, ">>>.");
      if (response.data.message === "success") {
        setReportModalOpen(false);

        toast.success("Provider reported successfully");
      } else {
        toast.error("Failed to report provider");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const navigate = useNavigate();

  const openChatModal = (booking) => {
    console.log(booking.provider, "::::::::::::::::;;");
    // setChatModalOpen(true);

    navigate("/userChat");
  };

  return (
    <>
      <UserNav />
      <Toaster />
      <div className="bg-gray-100 p-4 rounded-md shadow-md mt-16">
        <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
        <div className="flex space-x-4 mb-4">
          {/* Tabs for switching between accepted, upcoming, and canceled bookings */}
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "accepted"
                ? "bg-green-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("accepted")}
          >
            Upcoming
          </button>

          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "all" ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
        </div>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">You have no bookings yet.</p>
        ) : (
          <ul className="space-y-4">
            {filterBookings(activeTab).map((booking) => (
              <li
                key={booking._id}
                className={`p-4 rounded-md shadow-md flex justify-between items-center ${
                  booking.status === "accepted"
                    ? "bg-green-100"
                    : booking.status === "upcoming"
                    ? "bg-blue-100"
                    : "bg-red-100"
                }`}
              >
                <div>
                  {booking.serviceName.map((service, index) => (
                    <p
                      key={index}
                      className="text-xl font-semibold text-indigo-600"
                    >
                      {service}
                    </p>
                  ))}
                  {/* <h3 className="text-lg font-semibold">{booking.serviceName}</h3> */}
                  <p className="text-gray-600">Date: {booking.date}</p>
                  <p className="text-gray-600">Address: {booking.address}</p>
                  Total:{" "}
                  <button className="btn btn-active btn-accent">
                    {booking.Total}
                  </button>
                </div>
                <p>{booking.provider}</p>
                <div className="space-x-4">
                  <FontAwesomeIcon
                    onClick={() =>
                      booking.provider && handleReport(booking.provider)
                    }
                    icon={faExclamationTriangle}
                    style={{ color: "red" }}
                  />
                  {booking.status === "accepted" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover-bg-red-600"
                    >
                      Cancel
                    </button>
                  )}

                  <FontAwesomeIcon
                    onClick={() => openChatModal(booking)}
                    className="mt-12"
                    icon={faComment}
                    style={{ fontSize: "50px", color: "blue" }}
                  />
                  {isChatModalOpen && <Chat providerId={booking.provider} />}
                </div>
              </li>
            ))}
          </ul>
        )}
        {reportModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md rounded-lg">
            <div className="bg-white p-4 rounded-md shadow-md max-w-sm">
              <h2 className="text-xl font-semibold mb-4 text-center">Report</h2>
              <textarea
                rows="4"
                className="w-full p-2 mb-2 border rounded-md"
                placeholder="Please describe the issue"
                value={reportReason}
                onChange={(e) => setreportReason(e.target.value)}
              />
              <button
                onClick={submitReport}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Report
              </button>
              <button
                onClick={() => setReportModalOpen(false)}
                className="px-4 mx-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserBookings;
