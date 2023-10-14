import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import Spinner from "../Employee/Spinner";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmlkaGluc2ltb24iLCJhIjoiY2xtcnRnMXRuMDl6djJrcW05b2EzZHk3dSJ9.mBz6318PCWKLjMF-TxK-IQ";

const Modal = ({ closemodal ,handlelocation}) => {
  const [map, setMap] = useState(null);
  const [userLocationMarker, setUserLocationMarker] = useState(null);
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [isLoadingMap, setIsLoadingMap] = useState(true); 
  const [isLoadingSelectAddress, setIsLoadingSelectAddress] = useState(false); 
  

  const { userInfo } = useSelector((state) => state.user);
  const userid = userInfo.userExists._id;

  const handleSubmit = async (address, longitude, latitude) => {
    if (address.trim() === "") {
      Swal.fire(
        "Address Field Empty?",
        "Please choose Your location",
        "question"
      );
      return;
    }

    setIsLoadingSelectAddress(true);

    const res = await axios.post("http://localhost:5000/users/saveaddress", {
      userid,
      address,
      longitude,
      latitude,
    });
    handlelocation({address,longitude,latitude})

    setIsLoadingSelectAddress(false); 

    if (res.data.message === "user address saved") {
      Swal.fire(
        "Address saved",
        "You can now proceed to select a slot",
        "success"
      );
    }
  };

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [77.580643, 12.972442],
        zoom: 15,
      });

      setMap(newMap);

      newMap.on("load", () => {
        setIsLoadingMap(false); // Map has loaded, clear loading state
      });

      newMap.addControl(new mapboxgl.NavigationControl());
    };

    if (!map) {
      initializeMap();
    }
  }, [map]);

  const addMarker = (lng, lat) => {
    if (userLocationMarker) {
      userLocationMarker.remove();
    }
    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    setUserLocationMarker(marker);
  };

  const handleUseMyLocationClick = () => {
    setIsLoadingMap(true); // Set loading state while fetching geolocation

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          map.setCenter([longitude, latitude]);
          addMarker(longitude, latitude);
          reversegeocode(longitude, latitude);
          setLongitude(longitude);
          setLatitude(latitude);
          setIsLoadingMap(false); // Clear loading state
        },
        (error) => {
          console.error("Error getting user location:", error);
          setIsLoadingMap(false); // Clear loading state in case of an error
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
      setIsLoadingMap(false); // Clear loading state in case geolocation is not available
    }
  };

  const reversegeocode = (lng, lat) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      )
      .then((response) => {
        const place = response.data.features[0];
        const formattedAddress = place.place_name;
        setAddress(formattedAddress);
      })
      .catch((error) => {
        console.error("Error reverse geocoding:", error);
      });
  };

  return (
    <div>
      <Toaster />
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm mt-10">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-4/5 h-4/5 flex">
          <div
            className="relative"
            id="map"
            style={{ width: "100%", height: "565px" }}
          >
            {isLoadingMap ? ( // Display loader when map is loading
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner /> {/* Loading spinner */}
              </div>
            ) : (
              <button
                className="text-red-500 w-32 absolute inset-x-0 bottom-32 "
                onClick={handleUseMyLocationClick}
              >
                Use My Location
              </button>
            )}
          </div>

          <div className="w-4/5">
            <button
              className="bg-black"
              onClick={handleUseMyLocationClick}
              disabled={isLoadingSelectAddress} // Disable while loading
            >
              Use My Location
            </button>
            <h1 className="text-black text-xl font-semibold">Address</h1>
            <textarea
              className="bg-blue-100 text-black w-full h-24"
              value={address}
            />

            <button
              onClick={() => handleSubmit(address, longitude, latitude)}
              className="bg-black text-white"
              disabled={isLoadingSelectAddress} // Disable while loading
            >
              {isLoadingSelectAddress ? (
                <Spinner size={24} /> // Display loader while submitting
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
        <div className="relative bottom-72">
          <button
            onClick={closemodal}
            className="text-black w-14 h-14 rounded-full bg-red-500"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
