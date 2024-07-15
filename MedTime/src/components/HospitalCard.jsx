import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { Icon } from '@iconify/react';
import hospitalIcon from '@iconify-icons/mdi/hospital-building';
import phoneIcon from '@iconify-icons/icon-park-solid/phone-two';
import webIcon from '@iconify-icons/mdi/web-box';
import carIcon from '@iconify-icons/ic/baseline-directions-car-filled';
import trainIcon from '@iconify-icons/ph/train-fill';
import waitingAreaIcon from '@iconify-icons/medical-icon/i-waiting-area';
import distanceIcon from '@iconify-icons/material-symbols/distance';
import './HospitalCard.css';

const HospitalCard = ({ hospital, calculateAndDisplayRoute }) => {
  return (
    <div className="hospital-card">
      <div className="hospital-header">
        <Icon icon={hospitalIcon} className="hospital-icon" />
        <div className="hospital-info">
          <h3 className="hospital-name">{hospital.name}</h3>
          <p className="hospital-address">{hospital.address}</p>
        </div>
      </div>
      <div className="hospital-details">
        <div className="hospital-rating">
          <FaStar className="rating-icon" />
          <span className="rating-text">{hospital.rating} ({hospital.userRatingsTotal} reviews)</span>
        </div>
        <div className="hospital-contact">
          <Icon icon={phoneIcon} className="phone-icon" />
          <span className="contact-text">{hospital.phoneNumber || 'N/A'}</span>
          <Icon icon={webIcon} className="web-icon ml-4" />
          <span className="contact-text">
            {hospital.website ? (
              <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="website-link">
                Website
              </a>
            ) : (
              'N/A'
            )}
          </span>
        </div>
        <div className="hospital-distance">
          <Icon icon={distanceIcon} className="distance-icon" />
          <span className="distance-text">{hospital.distance || 'N/A'}</span>
        </div>
        <div className="hospital-waiting-time">
          <Icon icon={waitingAreaIcon} className="waiting-icon" />
          <span className="waiting-text">{hospital.waitingTime} min</span>
        </div>
      </div>
      <div className="hospital-footer">
        <div className="hospital-transport">
          <span className="link" onClick={() => calculateAndDisplayRoute(hospital.location, window.google.maps.TravelMode.DRIVING)}>
            <Icon icon={carIcon} className="car-icon" />
          </span>
          <span className="transport-text">{hospital.DRIVING || 'N/A'}</span>
          <span className="link" onClick={() => calculateAndDisplayRoute(hospital.location, window.google.maps.TravelMode.TRANSIT)}>
            <Icon icon={trainIcon} className="train-icon" />
          </span>
          <span className="transport-text">{hospital.TRANSIT || 'N/A'}</span>
        </div>
        <button className="db-navigator-button">
          <a href="https://int.bahn.de/en" target="_blank" rel="noopener noreferrer">DB Navigator</a>
        </button>
      </div>
    </div>
  );
};

HospitalCard.propTypes = {
  hospital: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    userRatingsTotal: PropTypes.number.isRequired,
    distance: PropTypes.string,
    DRIVING: PropTypes.string,
    TRANSIT: PropTypes.string,
    waitingTime: PropTypes.number.isRequired,
    phoneNumber: PropTypes.string,
    website: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  calculateAndDisplayRoute: PropTypes.func.isRequired,
};

export default HospitalCard;