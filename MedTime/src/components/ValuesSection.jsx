import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaHospital, FaClinicMedical, FaAmbulance, FaHeartbeat } from 'react-icons/fa';
import './ValuesSection.css';

function ValueCard({ icon: Icon, title, href }) {
  return (
    <motion.article
      className="value-card"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center p-5 mt-2 sm:mt-0">
        <a href={href} className="value-card-link">
          <div className="icon-container bg-blue-600 text-white rounded-full p-4">
            <Icon size={40} />
          </div>
        </a>
        <div className="mt-4 text-white font-bold text-lg">{title}</div>
      </div>
    </motion.article>
  );
}

ValueCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

function ValuesSection() {
  const values = [
    {
      icon: FaHospital,
      title: 'Find Hospital',
      href: '/hospital',
    },
    {
      icon: FaClinicMedical,
      title: 'Book a Doctor',
      href: '/doctor',
    },
    {
      icon: FaAmbulance,
      title: 'Find Pharmacy',
      href: '/pharmacy',
    },
    {
      icon: FaHeartbeat,
      title: 'Symptom Checker',
      href: '/symptom-checker',
    },
  ];

  return (
    <section className="values-section bg">
      <div className="flex flex-col items-center max-w-full w-full lg:w-[1030px]">
        <h2 className="text-blue-600">All in a distance of a click </h2>
        <section className="flex flex-wrap justify-center md:justify-start self-stretch px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {values.map((value, index) => (
              <ValueCard key={index} icon={value.icon} title={value.title} href={value.href} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default ValuesSection;