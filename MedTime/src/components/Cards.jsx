import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import iconHospital from '../assets/images/icon-hospital.svg';
import iconPharmacy from '../assets/images/icon-pharmacy.svg';
import iconDoctor from '../assets/images/icon-doctor.svg';
import iconSymptomChecker from '../assets/images/icon-symptom-checker.svg';
import './Cards.css'; // Import the Cards CSS

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
  useEffect(() => {
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 1s forwards';
          observer.unobserve(entry.target); // Stop observing once the animation is applied
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the card is in view
    });

    cards.forEach(card => {
      observer.observe(card);
    });

    return () => {
      cards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, []);

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