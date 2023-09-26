  mapboxgl.accessToken =
    "pk.eyJ1IjoibmlkaGluc2ltb24iLCJhIjoiY2xtcnRnMXRuMDl6djJrcW05b2EzZHk3dSJ9.mBz6318PCWKLjMF-TxK-IQ";


import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

function MapWithGeocoding() {
  const [userLocation, setUserLocation] = useState(null);


  const handleUseMyLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { longitude, latitude } = position.coords;
        const location = { longitude, latitude };
        console.log(location, ">>>>>>>>>>>>>>>>>>>>>>>");

        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.longitude},${location.latitude}.json?access_token=${mapboxgl.accessToken}`
        )
          .then((response) => response.json())
          .then((data) => {
            const address = data.features[0].place_name;
            setUserLocation({ ...location, address });
            console.log(userLocation, "?????????????????????????");
          })
          .catch((error) => {
            console.error("Error fetching reverse geocoding data:", error);
          });
      });
    } else {
      alert("Geolocation is not available in this browser.");
    }
  };


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", 
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-96, 37.8],
      zoom: 5,
    });

 

    return () => map.remove();
  }, []);

  return (
    <div>
      <button onClick={handleUseMyLocation}>Use My Location</button>
      {userLocation && (
        <div>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
          <p>Address: {userLocation.address}</p>
        </div>
      )}
      <div id="map" className="w-full h-[400px]"></div>
    </div>
  );
}

export default MapWithGeocoding;
