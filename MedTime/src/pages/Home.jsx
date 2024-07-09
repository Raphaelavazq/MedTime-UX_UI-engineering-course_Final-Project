// Import necessary components and assets
import Sidebar from '../components/Sidebar';
import Cards from '../components/Cards';
import mainImage from '../assets/images/main-image.png';
import './Home.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  return (
    <div className="home-container">
      {/* Sidebar component */}
      <Sidebar />
      <div className="main-content">
        {/* Header section with title */}
        <header className="header w-full">
          <div className="flex items-center">
            <h1 className="font-bold text-[#ec7137]">Quick</h1>
            <h2 className="text-[#3c5aa1]">&</h2>
            <h1 className="font-bold text-[#ec7137]">Smart</h1>
          </div>
          <h4 className="text-[#3c5aa1]">Solutions</h4>
        </header>
        {/* Main section with cards and image */}
        <main className="main">
          <Cards />
          <div className="image-container">
            <img src={mainImage} alt="Main" className="rocket" />
          </div>
        </main>
        {/* Link to the Pharmacy page */}
        <div className="flex justify-center mt-4">
          <Link to="/pharmacy" className="pharmacy-link">
            Locate the nearest pharmacy, click here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;