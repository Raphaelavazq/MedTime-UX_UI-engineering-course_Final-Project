import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import HospitalList from '../components/HospitalList';
import fetchHospitals from '../fetchHospitals';
import SearchHospitals from '../components/SearchHospitals';

const FindHospitalsPage = () => {
  const location = useLocation();
  const { postcode } = location.state || {};
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: { lat: 51.1657, lng: 10.4515 },
        zoom: 10,
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

      const mapDiv = document.getElementById('map');
      if (mapDiv) {
        const newMap = new window.google.maps.Map(mapDiv, mapOptions);

        const newDirectionsService = new window.google.maps.DirectionsService();
        const newDirectionsRenderer = new window.google.maps.DirectionsRenderer({ suppressMarkers: true });
        newDirectionsRenderer.setMap(newMap);

        setDirectionsService(newDirectionsService);
        setDirectionsRenderer(newDirectionsRenderer);
        setMap(newMap);
      }
    };

    const loadGoogleMapsScript = (apiKey) => {
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,directions`;
        script.async = true;
        script.defer = true;
        script.onload = () => initializeMap();
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const fetchApiKey = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/maps-api-key');
        const data = await response.json();
        loadGoogleMapsScript(data.apiKey);
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    };

    fetchApiKey();
  }, []);

  const calculateAndDisplayRoute = useCallback(
    (destination, travelMode) => {
      if (!directionsService || !directionsRenderer || !map) {
        console.error('Directions service, renderer, or map is not initialized');
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
                  map.setCenter(route.end_location);
                  setHospitals((prevHospitals) =>
                    prevHospitals.map((hospital) =>
                      hospital.location.lat === destination.lat && hospital.location.lng === destination.lng
                        ? {
                            ...hospital,
                            distance: route.distance.text,
                            [travelMode]: route.duration.text,
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
    },
    [directionsService, directionsRenderer, map]
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const hospitalsData = await fetchHospitals(postcode);
        setHospitals(hospitalsData);

        if (hospitalsData.length > 0) {
          hospitalsData.forEach((hospital) => {
            calculateAndDisplayRoute(hospital.location, window.google.maps.TravelMode.DRIVING);
            calculateAndDisplayRoute(hospital.location, window.google.maps.TravelMode.TRANSIT);
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (postcode) {
      fetchData();
    }
  }, [postcode, calculateAndDisplayRoute]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 p-4 lg:p-8">
        <SearchHospitals />
        <h2 className="text-2xl font-semibold mb-4">Hospitals near {postcode}</h2>
        {loading && <p>Loading...</p>}
        {!loading && hospitals.length === 0 && <p>No hospitals found.</p>}
        <HospitalList hospitals={hospitals} calculateAndDisplayRoute={calculateAndDisplayRoute} />
      </div>
      <div className="lg:w-1/2 h-96 lg:h-auto">
        <div id="map" className="w-full h-full"></div>
      </div>
    </div>
  );
};

export default FindHospitalsPage;