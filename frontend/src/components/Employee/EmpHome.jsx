import axios from 'axios';
import React, { useEffect ,useState} from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';



const socket = io('http://localhost:5000');
const EmpHome = () => {
  
const {providerInfo}=useSelector((state)=>state.employee)

const providerId=providerInfo.provider._id

  const [request, setRequest] = useState([]);

 
  useEffect(() => {
    
    const storedData = JSON.parse(localStorage.getItem('bookingData'));
    if (storedData) {
      setRequest(storedData);
    }

    socket.on('new-request', async (data) => {
      const bookingId = data.request;
      try {
        const res = await axios.post(`http://localhost:5000/provider/requests`, { bookingId });
        const booking = res.data;

        setRequest((prevRequests) => {
          const updatedRequests = [...prevRequests, booking];
          localStorage.setItem('bookingData', JSON.stringify(updatedRequests));
          return updatedRequests;
        });
      } catch (error) {
        console.log(error, "________________");
      }
    });

    return () => {
      socket.off('new-request');
    };
  }, []);
  return (
    <>
      <nav className="bg-white shadow dark:bg-gray-800">
        <div className="container flex items-center justify-center p-6 mx-auto text-white capitalize bg-gradient-to-tr from-indigo-400 to-blue-500 rounded-2xl  ">
          <a
            href="#"
            className="text-gray-800 transition-colors duration-300 transform border-b-2 border-blue-500 mx-1.5 sm:mx-6"
          >
            Homeyyy
          </a>

          <a
            href="#"
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Services
          </a>

          <a
            href="#"
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Bookings
          </a>

          <a
            href="#"
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Requests
          </a>
          <a
            href="#"
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Profile
          </a>

          <a
            href="#"
            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            <img
              className="w-5"
              src="https://res.cloudinary.com/dj8z6xx94/image/upload/v1695099995/notification-bell-svgrepo-com_qdvcgu.svg"
              alt=""
            />
          </a>
        </div>
      </nav>
      <div className="container mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4">Booking List</h2>
        <ul className="space-y-4">
          {request.map((booking, index) => (
            <li
              key={index + 1}
              className="bg-white p-4 shadow-md rounded-lg flex flex-col space-y-2"
            >
              <div className="flex justify-between">
                <div className="text-lg font-semibold">Booking Details</div>
                <div className="bg-blue-500 text-white px-2 py-1 rounded">
                  {booking.payment_status}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>User ID:</strong> {booking.userId}</p>
                  <p><strong>Payment ID:</strong> {booking.paymentId}</p>
                  <p><strong>Date:</strong> {booking.date}</p>
                </div>
                <div>
                  <p><strong>Total:</strong> {booking.Total}</p>
                  <p><strong>Payment Status:</strong> {booking.payment_status}</p>
                </div>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <p><strong>Address:</strong> {booking.address}</p>
              </div>
              {/* Add "Accept" and "Reject" buttons */}
              {!booking.accepted && !booking.rejected && (
                <div className="flex justify-between mt-3">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleAccept(index)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleReject(index)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

    </>
  );
};

export default EmpHome;
