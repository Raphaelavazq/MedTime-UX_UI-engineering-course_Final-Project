import { useState, useEffect } from 'react';
import heroPharmacy from '../assets/images/7.gif'; // Replace with your actual image path

const pharmacyTypes = ['Pharmacies', 'Drugstores', 'Chemists'];

const HeroPharmacies = () => {
  const [typeIndex, setTypeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypeIndex((prevIndex) => (prevIndex + 1) % pharmacyTypes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-yellow-500 mt-40 flex flex-col lg:flex-row justify-end items-center lg:items-start">
      <div className="lg:w-1/2 lg:mb-0 text-center lg:text-left">
        <h1
          aria-label="Find the nearest Pharmacies"
          className="text-4xl md:text-6xl lg:text-6xl font-bold"
          style={{ fontFamily: 'Fjalla One, sans-serif', color: 'white' }}
        >
          Find {' '}
          <span className="relative block h-16 md:h-20 lg:h-24 overflow-hidden">
            <span key={pharmacyTypes[typeIndex]} className="absolute inset-0 animate-bwwwin mt-5 text-blue-600">
              {pharmacyTypes[typeIndex]}
            </span>
          </span>
          <br />And get your Meds at your door with no time
        </h1>
      </div>
      <div className="lg:w-1/2 flex justify-center lg:justify-end">
        <img 
          src={heroPharmacy} 
          alt="Pharmacy" 
          className="hero-image w-full h-auto max-w-full lg:max-w-none large-image" 
        />
      </div>
    </div>
  );
};

export default HeroPharmacies;