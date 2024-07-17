import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchHospitals = () => {
  const [postcode, setPostcode] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (postcode) {
      navigate('/find-hospitals', { state: { postcode } });
    }
  };

  return (
    <div className="relative bg-yellow-500 p-4 md:p-4 flex flex-col justify-end">
      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Postcode..."
            className="p-2 pl-10 border border-gray-300 rounded w-full focus:outline-none focus:border-transparent"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
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

export default SearchHospitals;