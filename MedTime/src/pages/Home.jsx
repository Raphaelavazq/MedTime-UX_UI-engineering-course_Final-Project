import Sidebar from '../components/Sidebar';
import Cards from '../components/Cards';
import mainImage from '../assets/images/main-image.png';
import anotherImage from '../assets/images/another-image.png'; // Import the new image
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <main className="main">
          <Cards />
          <div className="image-container">
            <img src={mainImage} alt="Main" className="rocket" />
            <img src={anotherImage} alt="Another" className="bottom-image" /> {/* Add the new image */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;