import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import fetchHospitals from '../fetchHospitals';
import './Hospital.css';

const Hospital = () => {
  const [postcode, setPostcode] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({ lat: 51.1657, lng: 10.4515 }); // Center of Germany

  const handleSearch = async () => {
    if (!postcode) return; // Prevent search if postcode is empty
    setLoading(true);
    setError(null);
    try {
      const hospitalsData = await fetchHospitals(postcode);
      setHospitals(hospitalsData);
      if (hospitalsData.length > 0) {
        setCenter(hospitalsData[0].location); // Center map on the first result
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch hospitals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="hospital-container">
      <Sidebar />
      <div className="main-content">
        <div className="header">
          <h1>LET&apos;S <span className="highlight">FIND YOU A Hospital</span></h1>
          <input 
            type="text" 
            placeholder="Insert your postcode here" 
            value={postcode} 
            onChange={(e) => setPostcode(e.target.value)} 
            className="postcode-input"
            onKeyPress={handleKeyPress} // Add event listener for Enter key
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
        <div className="content">
          {loading && <div className="loading">Loading...</div>}
          {error && <div className="error">{error}</div>}
          <div className="hospital-list">
            {hospitals.map((hospital, index) => (
              <div key={index} className="hospital-card">
                <h2>{hospital.name}</h2>
                <p>{hospital.address}</p>
                <div className="info">
                  <div className="info-item">
                    <span>Rating:</span>
                    <span>{hospital.rating}</span>
                  </div>
                  <div className="info-item">
                    <span>Number of Ratings:</span>
                    <span>{hospital.userRatingsTotal}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="map">
            <iframe
              title="hospital-map"
              src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyAIlt680yFdvfn7owLo0ewwQ1mQoGKxbvQ&center=${center.lat},${center.lng}&zoom=6`}
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospital;