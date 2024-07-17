import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heroDoctor from '../assets/images/doctor.gif';

const specialties = ['Dentists', 'Cardiologists', 'Dermatologists', 'Pediatricians'];

const SearchDoctors = () => {
  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSpecialtyIndex((prevIndex) => (prevIndex + 1) % specialties.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    navigate('/book-doctor');
  };

  return (
    <div className="relative bg-yellow-500 p-6 mt-40 md:p-10 lg:p-30 flex flex-col justify-end">
      <div className="flex flex-col lg:flex-row items-start lg:items-start justify-end">
        <div className="lg:w-1/2">
          <h1
            aria-label="Find local doctors"
            className="text-4xl mt-6 md:text-6xl lg:text-6xl font-bold"
            style={{ fontFamily: 'Fjalla One, sans-serif', color: 'white' }}
          >
            Let&rsquo;s Find You {' '}
            <span className="relative block mt-2 text-7xl h-16 md:h-20 lg:h-24 ">
              <span key={specialties[specialtyIndex]} className="absolute inset-0 text-blue-600 animate-bwwwin">
                {specialties[specialtyIndex]}
              </span>
            </span>
          </h1>
        </div>
        <img 
          src={heroDoctor} 
          alt="Doctor" 
          className="hidden lg:block  lg:w-1/2 w-80 h-80 md:w-70 md:h-90 lg:w-100 lg:h-80" 
        />
      </div>
      <div className="mt-10 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Condition, procedure, doctor..."
            className="p-2 pl-10 border border-gray-300 rounded w-full focus:outline-none focus:border-transparent"
          />
        </div>
        <div className="relative w-full md:w-1/4">
          <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Location"
            className="p-2 pl-10 border border-gray-300 rounded w-full focus:outline-none focus:border-transparent"
          />
        </div>
        <button 
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchDoctors;