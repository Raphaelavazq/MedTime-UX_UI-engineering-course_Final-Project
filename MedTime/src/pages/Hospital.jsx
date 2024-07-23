import HeroHospitals from '../components/HeroHospitals';
import SearchHospitals from '../components/SearchHospitals';
import VerticalTimelineGuide from '../components/VerticalTimelineGuide';

const HospitalPage = () => {
  return (
    <div className="hospital-page-container ">
      <HeroHospitals title="Find the nearest " />
      <SearchHospitals />
      <VerticalTimelineGuide />
    </div>
  );
};

export default HospitalPage;