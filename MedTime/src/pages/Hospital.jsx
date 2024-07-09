import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import fetchHospitals from '../fetchHospitals';
import './Hospital.css';

const Hospital = () => {
  const [postcode, setPostcode] = useState('');
  const [displayedHospitals, setDisplayedHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({ lat: 51.1657, lng: 10.4515 });
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

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

  const handleSearch = async () => {
    if (!postcode) return;
    setLoading(true);
    setError(null);
    try {
      const hospitalsData = await fetchHospitals(postcode);
      setDisplayedHospitals(hospitalsData.slice(0, 4));
      if (hospitalsData.length > 0) {
        setCenter(hospitalsData[0].location);
        hospitalsData.forEach((hospital) => {
          calculateAndDisplayRoute(hospital.location, window.google.maps.TravelMode.DRIVING);
          calculateAndDisplayRoute(hospital.location, window.google.maps.TravelMode.TRANSIT);
        });
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

  const calculateAndDisplayRoute = (destination, travelMode) => {
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
              travelMode: travelMode,
            },
            (response, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
                const route = response.routes[0].legs[0];
                setDisplayedHospitals((prevHospitals) =>
                  prevHospitals.map((hospital) =>
                    hospital.location.lat === destination.lat && hospital.location.lng === destination.lng
                      ? {
                          ...hospital,
                          distance: route.distance.text,
                          [travelMode]: route.duration.text, // Add duration for the specific travel mode
                        }
                      : hospital
                  )
                );
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
            {loading && <div className="loading"><img src="src/assets/images/loading.gif" alt="Loading..." /></div>}
            {error && <div className="error">{error}</div>}
            {displayedHospitals.map((hospital, index) => (
              <div key={index} className="hospital-card">
                <h2>{hospital.name}</h2>
                <p>{hospital.address}</p>
                <p>Phone: {hospital.phoneNumber || 'N/A'}</p>
                <p>Website: {hospital.website ? <a href={hospital.website} target="_blank" rel="noopener noreferrer">{hospital.website}</a> : 'N/A'}</p>
                <div className="info">
                  <div className="info-item">
                    <span>Distance:</span>
                    <span>{hospital.distance || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="link" onClick={() => calculateAndDisplayRoute(hospital.location, window.google.maps.TravelMode.DRIVING)}>
                      By Car
                    </span>
                    <span>{hospital.DRIVING || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <div>
                      <span className="link" onClick={() => calculateAndDisplayRoute(hospital.location, window.google.maps.TravelMode.TRANSIT)}>
                        By Bus/Train
                      </span>
                      <span>{hospital.TRANSIT || 'N/A'}</span>
                    </div>
                    <a href="https://int.bahn.de/en" target="_blank" rel="noopener noreferrer" className="bus-link">DB Navigator</a>
                  </div>
                  <div className="info-item">
                    <span>ER Waiting Time:</span>
                    <span>{hospital.waitingTime} min</span>
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