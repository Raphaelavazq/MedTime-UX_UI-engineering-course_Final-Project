import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { Icon } from '@iconify/react';
import pharmacyIcon from '@iconify-icons/mdi/pharmacy';
import phoneIcon from '@iconify-icons/icon-park-solid/phone-two';
import webIcon from '@iconify-icons/mdi/web-box';
import carIcon from '@iconify-icons/ic/baseline-directions-car-filled';
import trainIcon from '@iconify-icons/ph/train-fill';
import distanceIcon from '@iconify-icons/material-symbols/distance';

const PharmacyList = ({ pharmacies, calculateAndDisplayRoute }) => {
  return (
    <ul className="">
      {pharmacies.map((pharmacy) => (
        <li key={pharmacy.name} className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 p-2 rounded mr-4 hover:bg-yellow-600">
              <Icon icon={pharmacyIcon} className="text-white text-3xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{pharmacy.name}</h3>
              <p className="text-gray-600">{pharmacy.address}</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <FaStar className="text-yellow-500 mr-2" />
              <span className="text-gray-800">{pharmacy.rating} ({pharmacy.userRatingsTotal} reviews)</span>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon={phoneIcon} className="text-gray-700 text-2xl mr-2" />
              <span className="text-gray-800">{pharmacy.phoneNumber || 'N/A'}</span>
              <Icon icon={webIcon} className="text-gray-700 text-2xl ml-4 mr-2" />
              <span className="text-gray-800">
                {pharmacy.website ? (
                  <a href={pharmacy.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Website
                  </a>
                ) : (
                  'N/A'
                )}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <Icon icon={distanceIcon} className="text-gray-700 text-2xl mr-2" />
              <span className="text-gray-800">{pharmacy.distance || 'N/A'}</span>
            </div>
            <div>
              <strong className="block text-gray-800 mb-2">Opening Hours:</strong>
              {pharmacy.openingHours ? (
                <ul className="list-disc list-inside text-gray-800">
                  {pharmacy.openingHours.map((hours, index) => (
                    <li key={index}>{hours}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-800">No opening hours available</p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <span
                className="cursor-pointer flex items-center mr-4"
                onClick={() => calculateAndDisplayRoute(pharmacy.location, window.google.maps.TravelMode.DRIVING)}
                role="button"
                tabIndex={0}
                onKeyPress={() => calculateAndDisplayRoute(pharmacy.location, window.google.maps.TravelMode.DRIVING)}
              >
                <Icon icon={carIcon} className="text-gray-700 text-3xl mr-4 hover:text-gray-900" />
              </span>
              <span
                className="cursor-pointer flex items-center"
                onClick={() => calculateAndDisplayRoute(pharmacy.location, window.google.maps.TravelMode.TRANSIT)}
                role="button"
                tabIndex={0}
                onKeyPress={() => calculateAndDisplayRoute(pharmacy.location, window.google.maps.TravelMode.TRANSIT)}
              >
                <Icon icon={trainIcon} className="text-gray-700 text-3xl hover:text-gray-900" />
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

PharmacyList.propTypes = {
  pharmacies: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  calculateAndDisplayRoute: PropTypes.func.isRequired,
};

export default PharmacyList;
