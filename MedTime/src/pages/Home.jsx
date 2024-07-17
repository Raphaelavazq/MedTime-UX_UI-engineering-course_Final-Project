import HeroHome from "../components/HeroHome";
import Header from "../components/Header";
import ValuesSection from "../components/ValuesSection"; // Import the new ValuesSection
import '../pages/Home.css'; 

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <HeroHome />
      <ValuesSection /> 
    </div>
  );
}

export default Home;