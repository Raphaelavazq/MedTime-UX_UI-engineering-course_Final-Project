import  { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import fetchPharmacies from '../fetchPharmacies';
import { Icon } from '@iconify/react';
import distanceIcon from '@iconify-icons/material-symbols/distance';
import carIcon from '@iconify-icons/material-symbols/directions-car';
import trainIcon from '@iconify-icons/material-symbols/train-rounded';
import Widget from '../components/Widget'; // Import the widget component
import './Pharmacy.css';

const Pharmacy = () => {
  const [postcode, setPostcode] = useState('');
  const [displayedPharmacies, setDisplayedPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({ lat: 51.1657, lng: 10.4515 });
  const [userLocation, setUserLocation] = useState(null);
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

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
        },
        (error) => {
          console.error('Error fetching geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleSearch = async () => {
    if (!postcode) return;
    setLoading(true);
    setError(null);
    try {
      const pharmaciesData = await fetchPharmacies(postcode);
      console.log('Mapped pharmacies data:', pharmaciesData);
      setDisplayedPharmacies(pharmaciesData.slice(0, 4));
      if (pharmaciesData.length > 0) {
        setCenter(pharmaciesData[0].location);
        pharmaciesData.forEach((pharmacy) => {
          calculateAndDisplayRoute(pharmacy.location, window.google.maps.TravelMode.DRIVING);
          calculateAndDisplayRoute(pharmacy.location, window.google.maps.TravelMode.TRANSIT);
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch pharmacies. Please try again.');
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
    if (!directionsService || !directionsRenderer || !userLocation) {
      console.error('Directions service, renderer, or user location is not initialized');
      return;
    }

    directionsService.route(
      {
        origin: userLocation,
        destination: destination,
        travelMode: travelMode,
      },
      (response, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(response);
          const route = response.routes[0].legs[0];
          setDisplayedPharmacies((prevPharmacies) =>
            prevPharmacies.map((pharmacy) =>
              pharmacy.location.lat === destination.lat && pharmacy.location.lng === destination.lng
                ? {
                    ...pharmacy,
                    distance: route.distance.text,
                    [travelMode]: route.duration.text,
                  }
                : pharmacy
            )
          );
        } else {
          console.error('Directions request failed due to ' + status);
        }
      }
    );
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
    fetchUserLocation();
  }, [loadGoogleMapsScript]);

  useEffect(() => {
    if (map) {
      map.setCenter(center);
      displayedPharmacies.forEach((pharmacy) => {
        new window.google.maps.Marker({
          position: pharmacy.location,
          map: map,
          title: pharmacy.name,
        });
      });
    }
  }, [center, displayedPharmacies, map]);

  return (
    <div className="pharmacy-container">
      <Sidebar />
      <div className="main-content">
        <div className="header">
          <Search 
            postcode={postcode}
            setPostcode={setPostcode}
            handleKeyPress={handleKeyPress}
            handleSearch={handleSearch}
            placeholderText="Enter postcode to find pharmacies..."
            headerText="Let's find you a Pharmacy!"
          />
        </div>
        <div className="content">
          <div className="pharmacy-list">
            {loading && <div className="loading"><img src="src/assets/images/loading.gif" alt="Loading..." /></div>}
            {error && <div className="error">{error}</div>}
            {displayedPharmacies.map((pharmacy, index) => (
              <div key={index} className="pharmacy-card">
                <h2>{pharmacy.name}</h2>
                <p>{pharmacy.address}</p>
                <div className="info">
                  <div className="info-item">
                    <Icon icon={distanceIcon} className="info-icon" /> {/* Distance icon */}
                    <span className="info-duration">{pharmacy.distance || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="link" onClick={() => calculateAndDisplayRoute(pharmacy.location, window.google.maps.TravelMode.DRIVING)}>
                      <Icon icon={carIcon} className="info-icon" /> {/* Car icon */}
                    </span>
                    <span className="info-duration">{pharmacy.DRIVING || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="link" onClick={() => calculateAndDisplayRoute(pharmacy.location, window.google.maps.TravelMode.TRANSIT)}>
                      <Icon icon={trainIcon} className="info-icon" /> {/* Train icon */}
                    </span>
                    <span className="info-duration">{pharmacy.TRANSIT || 'N/A'}</span>
                  </div>
                  <a href="https://int.bahn.de/en" target="_blank" rel="noopener noreferrer" className="bus-link">DB Navigator</a>
                </div>
                <div className="opening-hours">
                  <h3>Opening Hours:</h3>
                  {pharmacy.openingHours && pharmacy.openingHours.length > 0 ? (
                    pharmacy.openingHours.map((hours, i) => (
                      <p key={i}>{hours}</p>
                    ))
                  ) : (
                    <p>No opening hours available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div id="map" className="map"></div>
        </div>
        <Widget /> {/* Add the widget component here */}
      </div>
    </div>
  );
};

export default Pharmacy;