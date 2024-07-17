import HeroHome from "../components/HeroHome";
import Cards from "../components/Cards";
import Header from "../components/Header";
import ValuesSection from "../components/ValuesSection"; // Import the new ValuesSection
import '../pages/Home.css'; 

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <HeroHome />
      <ValuesSection /> {/* Add the ValuesSection component here */}
      <div className="cards-section">
        <Cards />
      </div>
    </div>
  );
}

export default Home;