// mapboxgl.accessToken = 'pk.eyJ1IjoibmlkaGluc2ltb24iLCJhIjoiY2xtcnRnMXRuMDl6djJrcW05b2EzZHk3dSJ9.mBz6318PCWKLjMF-TxK-IQ';

// mapboxgl.accessToken = 'pk.eyJ1IjoibmlkaGluc2ltb24iLCJhIjoiY2xtcnRnMXRuMDl6djJrcW05b2EzZHk3dSJ9.mBz6318PCWKLjMF-TxK-IQ';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

// Replace with your Mapbox access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibmlkaGluc2ltb24iLCJhIjoiY2xtcnRnMXRuMDl6djJrcW05b2EzZHk3dSJ9.mBz6318PCWKLjMF-TxK-IQ';

function MapWithGeocoding() {
  const mapContainerRef = useRef(null);
  const [userAddress, setUserAddress] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  const handleUseMyLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { longitude, latitude } = position.coords;
        const userCoordinates = [longitude, latitude];

        // Initialize the map
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: userCoordinates,
          zoom: 12,
        });

        // Create a marker for the user's location
        new mapboxgl.Marker()
          .setLngLat(userCoordinates)
          .addTo(map);

        // Use reverse geocoding to get the address
        axios
          .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`)
          .then((response) => {
            const address = response.data.features[0].place_name;
            setUserAddress(address);
          })
          .catch((error) => {
            console.error('Error fetching reverse geocoding data:', error);
          });

        setUserLocation(userCoordinates);
      });
    } else {
      alert('Geolocation is not available in this browser.');
    }
  };

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-96, 37.8],
      zoom: 20,
    });

    map.addControl(new mapboxgl.NavigationControl());

    return () => map.remove();
  }, []);

  return (
    <div className='flex justify-center align-bottom'>
      <div>
        <button onClick={handleUseMyLocation}>Use My Current Location</button>
      </div>
      <div className='flex justify-center' ref={mapContainerRef} style={{ width: '40%', height: '600px' }} />
      <div>
        {userLocation && <p>User Location: {userLocation.join(', ')}</p>}
       
        <textarea value={userAddress} className='h-36 w-80'/>
      </div>
    </div>
  );
}

export default MapWithGeocoding;
