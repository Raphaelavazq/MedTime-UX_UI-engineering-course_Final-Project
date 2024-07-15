import Sidebar from "../components/Sidebar";
import HeroHome from "../components/HeroHome";
import Cards from "../components/Cards";
import '../pages/Home.css'; // Import Home CSS

const Home = () => {
  return (
    <div className="home-page">
      <Sidebar />
      <HeroHome />
      <div className="cards-section">
        <Cards />
      </div>
    </div>
  );
}

export default Home;