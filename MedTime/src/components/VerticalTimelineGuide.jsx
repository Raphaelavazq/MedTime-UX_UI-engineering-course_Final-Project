import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  FaMapMarkerAlt,
  FaList,
  FaHospital,
  FaDirections,
  FaClock,
  FaPhone,
} from "react-icons/fa";
import "react-vertical-timeline-component/style.min.css";
import "./VerticalTimelineGuide.css"; // Import the CSS file

import step1 from '../assets/images/1.gif';
import step2 from '../assets/images/2.gif';
import step3 from '../assets/images/3.gif';
import step4 from '../assets/images/4.gif';
import step5 from '../assets/images/5.gif';
import step6 from '../assets/images/6.gif';

const steps = [
  {
    title: "Locate Nearby Hospitals",
    description: "Enter your postcode to search for hospitals in your area.",
    iconBg: "#FBC107",
    icon: <FaMapMarkerAlt className="timeline-icon" />,
    image: step1,
  },
  {
    title: "Browse Hospitals and Waiting Times",
    description: "Browse the list of hospitals and check their waiting times.",
    iconBg: "#FBC107",
    icon: <FaList className="timeline-icon" />,
    image: step2,
  },
  {
    title: "Get Hospital Details",
    description: "Select a hospital to see its details and location on the map.",
    iconBg: "#FBC107",
    icon: <FaHospital className="timeline-icon" />,
    image: step3,
  },
  {
    title: "Find the Best Route",
    description: "Get directions to the hospital with real-time navigation.",
    iconBg: "#FBC107",
    icon: <FaDirections className="timeline-icon" />,
    image: step4,
  },
  {
    title: "Check ER Waiting Times",
    description: "Check the estimated waiting times for the emergency room.",
    iconBg: "#FBC107",
    icon: <FaClock className="timeline-icon" />,
    image: step5,
  },
  {
    title: "Contact Hospitals",
    description: "Get contact details to call the hospital for more information.",
    iconBg: "#FBC107",
    icon: <FaPhone className="timeline-icon" />,
    image: step6,
  },
];

const StepCard = ({ step }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#FFF4E0",
        color: "#333333",
        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "30px",
      }}
      contentArrowStyle={{ borderRight: "7px solid #FBC107" }}
      iconStyle={{ background: step.iconBg }}
      icon={<div className="timeline-icon-container">{step.icon}</div>}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={step.image} alt={step.title} className="step-image" />
        <p className="step-description">{step.description}</p>
      </motion.div>
    </VerticalTimelineElement>
  );
};

StepCard.propTypes = {
  step: PropTypes.shape({
    iconBg: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

const VerticalTimelineGuide = () => (
  <div className="timeline-guide-container">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="timeline-header"
    >
      <p className="timeline-subtitle">How It Works</p>
      <h2 className="timeline-title">Using the Tool</h2>
    </motion.div>

    <div className="timeline-container">
      <VerticalTimeline>
        {steps.map((step, index) => (
          <StepCard key={`step-${index}`} step={step} />
        ))}
      </VerticalTimeline>
    </div>
  </div>
);

export default VerticalTimelineGuide;