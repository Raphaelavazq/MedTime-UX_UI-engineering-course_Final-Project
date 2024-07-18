import heroImage from '../assets/images/hero-image2.gif'; // Adjust the path as needed
import './HeroHome.css';

const HeroHome = () => {
  return (
    <div className="hero-home-container">
      <div className="hero-text">
        <h1 className="hero-title">
          <span className="text-yellow-500">Med</span><span className="text-blue-600">Time</span>
        </h1>
        <p className="hero-subtitle">Health Care without Waiting</p>
        <div className="hero-buttons">
          <button className="btn-join font-semibold">Join now</button>
          <button className="btn-learn font-semibold ">Learn More</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Hero" />
      </div>
    </div>
  );
}

export default HeroHome;