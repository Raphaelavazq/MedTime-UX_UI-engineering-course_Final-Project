import { FaVideo } from 'react-icons/fa';
const AppointmentDetails = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Book an appointment for free</h2>
      <p>The office partners  to schedule appointments</p>
      <div className="flex items-center mt-4">
        <div className="bg-yellow-500 p-2 rounded-full">
          <FaVideo className="text-blue-500" />
        </div>
        <p className="ml-2">External video visit</p>
      </div>
      <h3 className="mt-4">Scheduling details</h3>
      <div className="mt-2">
        <select className="p-2 border bg bg-yellow-100 rounded w-full">
          <option>Illness</option>
          <option>urgent</option>
          <option>Perscription</option>
        </select>
      </div>
      <div className="mt-2">
        <input type="text" placeholder="I'll choose my insurance later" className="p-2 border rounded w-full" />
      </div>
      <div className="mt-2 flex space-x-2">
        <button className="p-2 border rounded w-full">New patient</button>
        <button className="p-2 border rounded w-full">Returning patient</button>
      </div>
      <h3 className="mt-4">Available appointments</h3>
      <div className="mt-2">
        <select className="p-2 border bg-yellow-100 rounded w-full">
          <option>Berlin</option>
          <option>London</option>
          <option>Lisbon</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {/* Generate appointment dates dynamically */}
          {Array.from({ length: 14 }, (_, index) => (
            <div key={index} className="bg-yellow-500 p-2 rounded w-24 text-center">
              <p>Mon Jul {index + 15}</p>
              <p>{index % 2 === 0 ? `${20 + index} appts` : 'No appts'}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="mt-4 text-blue-500 hover:underline">View more availability</button>
      <button className="mt-4 w-full p-2 bg-blue-500 text-white rounded">Book an appointment</button>
    </div>
  );
};

export default AppointmentDetails;