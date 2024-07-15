import PropTypes from 'prop-types';
import HospitalCard from './HospitalCard';

const HospitalList = ({ hospitals, calculateAndDisplayRoute }) => {
  return (
    <div className="hospital-list">
      {hospitals.map((hospital, index) => (
        <HospitalCard key={index} hospital={hospital} calculateAndDisplayRoute={calculateAndDisplayRoute} />
      ))}
    </div>
  );
};

HospitalList.propTypes = {
  hospitals: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  calculateAndDisplayRoute: PropTypes.func.isRequired,
};

export default HospitalList;