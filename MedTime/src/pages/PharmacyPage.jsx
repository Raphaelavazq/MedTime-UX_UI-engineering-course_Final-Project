import HeroPharmacies from '../components/HeroPharmacies';
import SearchPharmacies from '../components/SearchPharmacies';

const PharmacyPage = () => {
  return (
    <div className="pharmacy-page-container">
      <HeroPharmacies />
      <div className="mt-30 md:mt-16 lg:mt-20 xl:mt-24">
        <SearchPharmacies />
      </div>
    </div>
  );
};

export default PharmacyPage;
