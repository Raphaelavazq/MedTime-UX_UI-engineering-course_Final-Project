import HeroHospitals from '../components/HeroPharmacies';
import SearchPharmacies from '../components/SearchPharmacies';

const PharmacyPage = () => {
  return (
    <div className="pharmacy-page-container">
      <HeroHospitals title="Find the nearest Pharmacy" />
      <SearchPharmacies />
    </div>
  );
};

export default PharmacyPage;