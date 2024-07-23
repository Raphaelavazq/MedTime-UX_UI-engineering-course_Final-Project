import HeroHome from "../components/HeroHome";
import Header from "../components/Header";
import ValuesSection from "../components/ValuesSection"; 
import TopSpecialties from '../components/TopSpecialties';
import FeaturedServices from '../components/FeaturedServices';

import '../pages/Home.css'; 

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <HeroHome />
      <ValuesSection /> 
      <TopSpecialties />
      <FeaturedServices />
     
    </div>
  );
}

export default Home;