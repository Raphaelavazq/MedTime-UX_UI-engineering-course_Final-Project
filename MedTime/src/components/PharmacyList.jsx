// src/components/PharmacyList.jsx

import PropTypes from 'prop-types';

const PharmacyList = ({ pharmacies, calculateAndDisplayRoute }) => {
  return (
    <ul>
      {pharmacies.map((pharmacy) => (
        <li key={pharmacy.name} className="mb-4 p-4 border rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{pharmacy.name}</h3>
          <p>{pharmacy.address}</p>
          <p>Rating: {pharmacy.rating} ({pharmacy.userRatingsTotal} reviews)</p>
          <p>Phone: {pharmacy.phoneNumber}</p>
          <p>Website: <a href={pharmacy.website} target="_blank" rel="noopener noreferrer">{pharmacy.website}</a></p>
          <div>
            <strong>Opening Hours:</strong>
            {pharmacy.openingHours ? (
              <ul>
                {pharmacy.openingHours.map((hours, index) => (
                  <li key={index}>{hours}</li>
                ))}
              </ul>
            ) : (
              <p>No opening hours available</p>
            )}
          </div>
          <button 
            className="mt-2 mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => calculateAndDisplayRoute(pharmacy.location, window.google.maps.TravelMode.DRIVING)}>
            Get Driving Directions
          </button>
          <button 
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={() => calculateAndDisplayRoute(pharmacy.location, window.google.maps.TravelMode.TRANSIT)}>
            Get Transit Directions
          </button>
        </li>
      ))}
    </ul>
  );
};

PharmacyList.propTypes = {
  pharmacies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    rating: PropTypes.number,
    userRatingsTotal: PropTypes.number,
    phoneNumber: PropTypes.string,
    website: PropTypes.string,
    openingHours: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  calculateAndDisplayRoute: PropTypes.func.isRequired,
};

export default PharmacyList;