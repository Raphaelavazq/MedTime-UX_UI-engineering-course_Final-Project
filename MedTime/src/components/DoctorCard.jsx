import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaVideo, FaRegCalendarAlt } from 'react-icons/fa';
import Modal from '../components/Modal.jsx';
import AppointmentDetails from './AppointmentDetails';

const DoctorCard = ({ doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="border bg-white p-4 mb-4 border-blue-600 rounded-lg flex flex-col md:flex-row justify-between">
      <div className="flex items-start">
        <img src={doctor.image} alt={doctor.name} className="w-24 h-24 bg-blue-600 rounded-full" />
        <div className="ml-4">
          <h3 className="text-xl font-bold">{doctor.name}</h3>
          <p>{doctor.specialty}</p>
          <div className="flex items-center my-2">
            <FaStar className="text-yellow-500" />
            <span className="ml-2">{doctor.rating} ({doctor.reviews} reviews)</span>
          </div>
          <div className="flex items-center my-2">
            <FaVideo className={doctor.video ? 'text-blue-600' : 'text-black'} />
            <span className="ml-2">{doctor.video ? 'Video Visit' : 'No Video'}</span>
          </div>
          <button onClick={openModal} className="text-blue-600">View all availability</button>
        </div>
      </div>
      <div className="flex flex-col justify-center  border-blue-600 mt-4 md:mt-0 md:ml-4">
        {doctor.appointments.map((appt, index) => (
          <div key={index} className="flex items-center border-blue-600 justify-between p-2 bg-white rounded mb-1">
            <span>{appt}</span>
            <FaRegCalendarAlt className="text-blue-500 ml-2" />
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AppointmentDetails />
      </Modal>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    video: PropTypes.bool,
    appointments: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default DoctorCard;