import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import iconHospital from '../assets/images/icon-hospital.svg';
import iconPharmacy from '../assets/images/icon-pharmacy.svg';
import iconDoctor from '../assets/images/icon-doctor.svg';
import iconSymptomChecker from '../assets/images/icon-symptom-checker.svg';
import './Cards.css';

const Card = ({ icon, title, description, link }) => {
  return (
    <div className="card">
      <img src={icon} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={link} className="card-button">Click Here</Link>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const Cards = () => {
  return (
    <div className="cards-container">
      <Card
        icon={iconHospital}
        title="Locate a Hospital"
        description="Queuing without the hustle"
        link="/hospital"
      />
      <Card
        icon={iconPharmacy}
        title="Locate a Pharmacy"
        description="Purchase Medicines"
        link="/pharmacy"
      />
      <Card
        icon={iconDoctor}
        title="Find a Doctor"
        description="Book an online appointment"
        link="/doctor"
      />
      <Card
        icon={iconSymptomChecker}
        title="Symptom Checker"
        description="Enter your symptoms and get insights"
        link="/symptom-checker"
      />
    </div>
  );
};

export default Cards;