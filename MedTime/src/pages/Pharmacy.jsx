import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import { Icon } from '@iconify/react';
import distanceIcon from '@iconify-icons/material-symbols/distance';
import carIcon from '@iconify-icons/material-symbols/directions-car';
import trainIcon from '@iconify-icons/material-symbols/train-rounded';
import Widget from '../components/Widget'; // Import the widget component
import './Doctor.css';

const fetchDoctors = async (specialty, postcode) => {
  try {
    const { data } = await axios.get('http://localhost:3001/api/doctors', {
      params: {
        specialty,
        postcode,
      },
    });

    return data.map((place) => ({
      name: place.name,
      address: place.formatted_address,
      location: place.geometry.location,
      phoneNumber: place.phoneNumber,
      website: place.website,
      openingHours: place.openingHours,
    }));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

const Doctors = () => {
  const [postcode, setPostcode] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [displayedDoctors, setDisplayedDoctors] = useState([]);
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
    if (!postcode || !specialty) return;
    setLoading(true);
    setError(null);
    try {
      const doctorsData = await fetchDoctors(specialty, postcode);
      console.log('Mapped doctors data:', doctorsData);
      setDisplayedDoctors(doctorsData.slice(0, 4));
      if (doctorsData.length > 0) {
        setCenter(doctorsData[0].location);
        doctorsData.forEach((doctor) => {
          calculateAndDisplayRoute(doctor.location, window.google.maps.TravelMode.DRIVING);
          calculateAndDisplayRoute(doctor.location, window.google.maps.TravelMode.TRANSIT);
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch doctors. Please try again.');
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
          setDisplayedDoctors((prevDoctors) =>
            prevDoctors.map((doctor) =>
              doctor.location.lat === destination.lat && doctor.location.lng === destination.lng
                ? {
                    ...doctor,
                    distance: route.distance.text,
                    [travelMode]: route.duration.text,
                  }
                : doctor
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
      displayedDoctors.forEach((doctor) => {
        new window.google.maps.Marker({
          position: doctor.location,
          map: map,
          title: doctor.name,
        });
      });
    }
  }, [center, displayedDoctors, map]);

  return (
    <div className="doctor-container">
      <Sidebar />
      <div className="main-content">
        <div className="header">
          <Search
            postcode={postcode}
            setPostcode={setPostcode}
            specialty={specialty}
            setSpecialty={setSpecialty}
            handleKeyPress={handleKeyPress}
            handleSearch={handleSearch}
            placeholderText="Enter postcode and specialty to find doctors..."
            headerText="Let's find you a Doctor!"
          />
        </div>
        <div className="content">
          <div className="doctor-list">
            {loading && <div className="loading"><img src="src/assets/images/loading.gif" alt="Loading..." /></div>}
            {error && <div className="error">{error}</div>}
            {displayedDoctors.map((doctor, index) => (
              <div key={index} className="doctor-card">
                <h2>{doctor.name}</h2>
                <p>{doctor.address}</p>
                <div className="info">
                  <div className="info-item">
                    <Icon icon={distanceIcon} className="info-icon" /> {/* Distance icon */}
                    <span className="info-duration">{doctor.distance || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="link" onClick={() => calculateAndDisplayRoute(doctor.location, window.google.maps.TravelMode.DRIVING)}>
                      <Icon icon={carIcon} className="info-icon" /> {/* Car icon */}
                    </span>
                    <span className="info-duration">{doctor.DRIVING || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="link" onClick={() => calculateAndDisplayRoute(doctor.location, window.google.maps.TravelMode.TRANSIT)}>
                      <Icon icon={trainIcon} className="info-icon" /> {/* Train icon */}
                    </span>
                    <span className="info-duration">{doctor.TRANSIT || 'N/A'}</span>
                  </div>
                  <a href="https://int.bahn.de/en" target="_blank" rel="noopener noreferrer" className="bus-link">DB Navigator</a>
                </div>
                <div className="opening-hours">
                  <h3>Opening Hours:</h3>
                  {doctor.openingHours && doctor.openingHours.length > 0 ? (
                    doctor.openingHours.map((hours, i) => (
                      <p key={i}>{hours}</p>
                    ))
                  ) : (
                    <p>No opening hours available</p>
                  )}
                </div>
                <div className="appointment">
                  <a href={doctor.website} target="_blank" rel="noopener noreferrer" className="appointment-link">
                    Book Appointment
                  </a>
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

export default Doctors;