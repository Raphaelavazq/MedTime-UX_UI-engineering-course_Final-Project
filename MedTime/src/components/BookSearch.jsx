import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const BookSearch = () => {
  return (
    <div className="flex mt-40 items-center space-x-4">
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
      <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75">Search</button>
    </div>
  );
};

export default BookSearch;