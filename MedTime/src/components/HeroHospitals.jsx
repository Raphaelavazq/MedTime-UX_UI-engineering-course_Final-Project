import { useState, useEffect } from 'react';
import heroDoctor from '../assets/images/HeroHospital1.gif';
import './HeroHospitals.css';  // Import the CSS file for custom styles

const hospitalTypes = ['Hospitals', 'Clinics', 'Urgent Care'];

const HeroHospitals = () => {
  const [typeIndex, setTypeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypeIndex((prevIndex) => (prevIndex + 1) % hospitalTypes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-yellow-500 mt-40 flex flex-col lg:flex-row justify-end items-center lg:items-start">
      <div className="lg:w-1/2  lg:mb-0 text-center lg:text-left">
        <h1 aria-label="Find the nearest hospitals without waiting more than you have" className="text-4xl md:text-6xl lg:text-6xl font-bold">
          Find {' '}
          <span className="relative block h-12 md:h-14 lg:h-16 overflow-hidden">
            <span key={hospitalTypes[typeIndex]} className="absolute inset-0 animate-bwwwin">
              {hospitalTypes[typeIndex]}
            </span>
          </span>
          <br />Just go when you have to
        </h1>
      </div>
      <div className="lg:w-1/2 flex justify-center lg:justify-end">
        <img 
          src={heroDoctor} 
          alt="Doctor" 
          className="hero-image w-full h-auto max-w-full lg:max-w-none large-image" 
        />
      </div>
    </div>
  );
};

export default HeroHospitals;