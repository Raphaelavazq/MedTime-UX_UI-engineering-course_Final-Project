import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const BookSearch = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-full lg:w-1/2">
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Condition, procedure, doctor..."
          className="p-2 pl-10 border border-gray-300 rounded w-full focus:outline-none focus:border-transparent"
        />
      </div>
      <div className="relative w-full lg:w-1/4">
        <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Location"
          className="p-2 pl-10 border border-gray-300 rounded w-full focus:outline-none focus:border-transparent"
        />
      </div>
      <button className="p-2 bg-orange-500 text-white rounded w-full lg:w-auto">Search</button>
    </div>
  );
};

export default BookSearch;