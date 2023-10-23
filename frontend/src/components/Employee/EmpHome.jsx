import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import axios from "axios";

const EmpHome = () => {
  const { providerInfo } = useSelector((state) => state.employee);
  const providerId = providerInfo.provider._id;
  console.log(providerId, "...");
  const socket = io("http://localhost:5000");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    socket.emit("join-provider-room", providerId);

    socket.on("cancel-booking", (data) => {
      // Remove the canceled booking from the UI
      const canceledBookingId = data.bookingId;
      setRequests((prevRequests) =>
        prevRequests.filter((booking) => booking._id !== canceledBookingId)
      );
    });

    socket.on("new-booking-for-provider", (data) => {
      const newBooking = data.booking;
      if (
        newBooking.status !== "accepted" &&
        !requests.find((booking) => booking._id === newBooking._id)
      ) {
        setRequests((prevRequests) => [...prevRequests, newBooking]);
      }
    });

    socket.on("booking-accepted", (data) => {
      const acceptedBooking = data.booking;
      const acceptedBookingIndex = requests.findIndex(
        (booking) => booking._id === acceptedBooking._id
      );

      if (acceptedBookingIndex !== -1) {
        const updatedRequests = [...requests];
        updatedRequests.splice(acceptedBookingIndex, 1);
        setRequests(updatedRequests);
      }
    });

    return () => {
      socket.off("new-booking-for-provider");
    };
  }, [providerId]);

  const handleAccept = (bookingId) => {
    console.log("ddhgdgdgh");
    axios
      .put(`http://localhost:5000/boookings/accept/${bookingId}`, {
        providerId,
      })
      .then((response) => {
        console.log(response, ">>..");
        if (response.data.success) {
          toast.success("Booking accepted");
          // Remove the accepted booking from the UI
          const updatedRequests = requests.filter(
            (booking) => booking._id !== bookingId
          );
          setRequests(updatedRequests);
        }
      })
      .catch((error) => {
        console.error("Error accepting booking:", error);
      });
  };

  const handleReject = (bookingId) => {
    const updatedRequests = requests.filter(
      (booking) => booking._id !== bookingId
    );
    setRequests(updatedRequests);
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="container mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4">Booking List</h2>
        {requests.length === 0 ? (
          <div className="flex justify-center mt-10">
            <p className="uppercase font-semibold text-lg">
              No bookings available at the moment.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {requests.map((booking, index) => (
              <li
                key={booking._id}
                className="bg-white p-4 shadow-md rounded-lg flex flex-col space-y-2"
              >
                <div>
                  <p>Booking ID: {booking._id}</p>
                  <p>User Name: {booking.userId}</p>
                  <p>Location: {booking.address}</p>
                  <p>Total: {booking.Total}</p>
                </div>
                <div className="flex justify-between mt-3">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleAccept(booking._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleReject(booking._id)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default EmpHome;
