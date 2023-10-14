import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const Success = () => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoibmlkaGluc2ltb24iLCJhIjoiY2xtcnRnMXRuMDl6djJrcW05b2EzZHk3dSJ9.mBz6318PCWKLjMF-TxK-IQ";

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);

        const map = new mapboxgl.Map({
          container: 'map-container', // Replace with your HTML element's ID
          style: 'mapbox://styles/mapbox/streets-v11', // You can change the map style here
          center: [longitude, latitude], // Set the initial map center coordinates
          zoom: 12, // Set the initial zoom level
        });

        return () => map.remove(); // Clean up the map when the component unmounts
      });
    }
  }, [longitude, latitude]);

  return (
    <div className="flex justify-center items-center h-screen relative">
      {/* Map container */}
      <div id="map-container" className="absolute top-0 left-0 w-full flex  justify-center h-5/6"></div>

      <div className="bg-slate-300 w-72 sm:w-96 h-48 rounded-xl flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 z-10">
        <span className="loading loading-spinner text-success"></span>
        <h1 className="text-center text-lg sm:text-xl md:text-xl lg:text-xl">
          We are searching for Providers. Please be patient.
        </h1>
      </div>
    </div>
  );
};

export default Success;
