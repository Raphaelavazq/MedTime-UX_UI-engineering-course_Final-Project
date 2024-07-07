import  { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import fetchHospitals from '../fetchHospitals';
import axios from 'axios';
import './Hospital.css';

const Hospital = () => {
  const [postcode, setPostcode] = useState('');
  const [displayedHospitals, setDisplayedHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({ lat: 51.1657, lng: 10.4515 }); // Center of Germany
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  // Initialize the map
  const initializeMap = useCallback(() => {
    const mapOptions = {
      center: center,
      zoom: 8,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: window.google.maps.ControlPosition.TOP_RIGHT,
      },
      styles: [
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#ffffff' }],
        },
        {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#000000' }, { lightness: 13 }],
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.fill',
          stylers: [{ color: '#000000' }],
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#144b53' }, { lightness: 14 }, { weight: 1.4 }],
        },
        // Add more style customization as needed
      ],
    };

    const newMap = new window.google.maps.Map(document.getElementById('map'), mapOptions);
    setMap(newMap);

    const newDirectionsService = new window.google.maps.DirectionsService();
    const newDirectionsRenderer = new window.google.maps.DirectionsRenderer();
    newDirectionsRenderer.setMap(newMap);

    setDirectionsService(newDirectionsService);
    setDirectionsRenderer(newDirectionsRenderer);
  }, [center]);

  // Load the Google Maps script
  const loadGoogleMapsScript = useCallback((apiKey) => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,directions`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, [initializeMap]);

  // Handle the search for hospitals
  const handleSearch = async () => {
    if (!postcode) return; // Prevent search if postcode is empty
    setLoading(true);
    setError(null);
    try {
      const hospitalsData = await fetchHospitals(postcode);
      setDisplayedHospitals(hospitalsData.slice(0, 4)); // Display only the first 4 hospitals
      if (hospitalsData.length > 0) {
        setCenter(hospitalsData[0].location); // Center map on the first result
        calculateAndDisplayRoute(hospitalsData[0].location);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch hospitals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Calculate and display the route from current location to the hospital
  const calculateAndDisplayRoute = (destination) => {
    if (!directionsService || !directionsRenderer) {
      console.error('Directions service or renderer is not initialized');
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const origin = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          directionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
              } else {
                console.error('Directions request failed due to ' + status);
              }
            }
          );
        },
        (error) => {
          console.error('Error fetching geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/maps-api-key');
        loadGoogleMapsScript(response.data.apiKey);
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    };

    fetchApiKey();
  }, [loadGoogleMapsScript]);

  useEffect(() => {
    if (map) {
      map.setCenter(center);
      displayedHospitals.forEach((hospital) => {
        new window.google.maps.Marker({
          position: hospital.location,
          map: map,
          title: hospital.name,
        });
      });
    }
  }, [center, displayedHospitals, map]);

  return (
    <div className="hospital-container">
      <Sidebar />
      <div className="main-content">
        <div className="header">
          <Search 
            postcode={postcode}
            setPostcode={setPostcode}
            handleKeyPress={handleKeyPress}
            handleSearch={handleSearch}
          />
        </div>
        <div className="content">
          <div className="hospital-list">
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            {displayedHospitals.map((hospital, index) => (
              <div key={index} className="hospital-card">
                <h2>{hospital.name}</h2>
                <p>{hospital.address}</p>
                <div className="info">
                  <div className="info-item">
                    <span>Rating:</span>
                    <span>{hospital.rating}</span>
                  </div>
                  <div className="info-item">
                    <span>Number of Ratings:</span>
                    <span>{hospital.userRatingsTotal}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div id="map" className="map"></div>
        </div>
      </div>
    </div>
  );
};

export default Hospital;