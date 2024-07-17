import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hospital from './pages/Hospital';
import PharmacyPage from './pages/PharmacyPage'; 
import FindPharmacy from './pages/FindPharmacy'; 
import Doctors from './pages/Doctors';
import BookDoctorPage from './pages/BookDoctorPage';
import Header from './components/Header';
import SearchHospitals from './components/SearchHospitals';
import FindHospitalsPage from './pages/FindHospitalsPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/pharmacy" element={<PharmacyPage />} />
        <Route path="/find-pharmacy" element={<FindPharmacy />} /> 
        <Route path="/doctor" element={<Doctors />} />
        <Route path="/book-doctor" element={<BookDoctorPage />} />
        <Route path="/search-hospitals" element={<SearchHospitals />} />
        <Route path="/find-hospitals" element={<FindHospitalsPage />} />
      </Routes>
    </Router>
  );
};

export default App;