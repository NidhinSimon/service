import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import io from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [providerInfo, setProviderInfo] = useState("");

  const socket = io("http://localhost:5000");

  const { userInfo } = useSelector((state) => state.user);

  const userId = userInfo.userExists._id;

  const navigate=useNavigate()

  useEffect(() => {
    let providerInfoTimeout;

    // Clear provider info after 3 minutes (3 * 60 * 1000 milliseconds)
    const clearProviderInfo = () => {
      localStorage.removeItem('providerInfo');
      setProviderInfo("");
      navigate('/home')
      
      // Navigate to the home page or your orders page here
      // Example: window.location.href = '/home';
    };

    const handleBookingAccepted = (data) => {
      const bookingId = data.booking._id;
      console.log(bookingId, "..");
      localStorage.setItem('bookingId', bookingId);

      const receivedProviderInfo = data.providerInfo;
      console.log(receivedProviderInfo, "Provider info received");
      setProviderInfo(receivedProviderInfo);
      localStorage.setItem('providerInfo', JSON.stringify(receivedProviderInfo));

      // Set a timeout to clear provider info after 3 minutes
      providerInfoTimeout = setTimeout(clearProviderInfo, 3 * 60 * 1000);
    };

    socket.on('booking-accepted', handleBookingAccepted);

    mapboxgl.accessToken = "pk.eyJ1IjoibmlkaGluc2ltb24iLCJhIjoiY2xtcnRnMXRuMDl6djJrcW05b2EzZHk3dSJ9.mBz6318PCWKLjMF-TxK-IQ";

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);

        const map = new mapboxgl.Map({
          container: 'map-container',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [longitude, latitude],
          zoom: 12,
        });

        return () => {
          map.remove();
          // Clear the providerInfoTimeout when unmounting the component
          clearTimeout(providerInfoTimeout);
        };
      });

      const storedProviderInfo = localStorage.getItem('providerInfo');
      if (storedProviderInfo) {
        setProviderInfo(JSON.parse(storedProviderInfo));
      }
    }

    return () => {
      // Clear the providerInfoTimeout when unmounting the component
      clearTimeout(providerInfoTimeout);
    };
  }, [longitude, latitude]);


  // const fetchBooking=async(bookingId)=>{
  //   console.log(bookingId,"...")
  //   const res=await axios.post(`http://localhost:5000/users/getbookings/${userId}`,{bookingId})
  //   console.log(res,'POPOPOPOPOPOPOPOPOPOPOPOPOPOPOPOPOPOPOPOPOPO')
  //   setProviderInfo(res.data.providerInfo)
  // }

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div id="map-container" className="absolute top-0 left-0 w-full flex justify-center h-5/6"></div>

      <div className="bg-slate-300 w-72 sm:w-96 h-48 rounded-xl flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 z-10">
        <span className="loading loading-spinner text-success"></span>
        <h1 className="text-center text-lg sm:text-xl md:text-xl lg:text-xl">
          We are searching for Providers. Please be patient.
        </h1>
      
        {providerInfo && (
          <div>
            <div className="profile-info">
              <img src={""} alt="Provider" />
              <h1>{providerInfo.name}</h1>
              <p>Phone: {providerInfo.mobile}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Success;
