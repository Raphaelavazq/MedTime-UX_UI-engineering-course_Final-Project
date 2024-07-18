import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hospital from './pages/Hospital';
import PharmacyPage from './pages/PharmacyPage'; 
import FindPharmacy from './pages/FindPharmacy'; 
import Doctors from './pages/Doctors';
import BookDoctorPage from './pages/BookDoctorPage';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchHospitals from './components/SearchHospitals';
import FindHospitalsPage from './pages/FindHospitalsPage';
import AuthenticationPage from './pages/AuthenticationPage';
import SymptomChecker from './pages/SymptomChecker';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthenticationPage />} />
        <Route path="/signup" element={<AuthenticationPage />} />

        <Route
          path="/"
          element={
            <>
              <Header fixed={true} />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/hospital"
          element={
            <>
              <Header fixed={false} />
              <Hospital />
              <Footer />
            </>
          }
        />
        <Route
          path="/pharmacy"
          element={
            <>
              <Header fixed={false} />
              <PharmacyPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/find-pharmacy"
          element={
            <>
              <Header fixed={false} />
              <FindPharmacy />
              <Footer />
            </>
          }
        />
        <Route
          path="/doctor"
          element={
            <>
              <Header fixed={false} />
              <Doctors />
              <Footer />
            </>
          }
        />
        <Route
          path="/book-doctor"
          element={
            <>
              <Header fixed={false} />
              <BookDoctorPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/search-hospitals"
          element={
            <>
              <Header fixed={false} />
              <SearchHospitals />
              <Footer />
            </>
          }
        />
        <Route
          path="/find-hospitals"
          element={
            <>
              <Header fixed={false} />
              <FindHospitalsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/symptom-checker"
          element={
            <>
              <Header fixed={true} />
              <SymptomChecker />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;