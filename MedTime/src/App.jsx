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
import AuthenticationPage from './pages/AuthenticationPage';
import SymtomChecker from './pages/SymptomChecker';
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
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/hospital"
          element={
            <>
              <Header />
              <Hospital />
            </>
          }
        />
        <Route
          path="/pharmacy"
          element={
            <>
              <Header />
              <PharmacyPage />
            </>
          }
        />
        <Route
          path="/find-pharmacy"
          element={
            <>
              <Header />
              <FindPharmacy />
            </>
          }
        />
        <Route
          path="/doctor"
          element={
            <>
              <Header />
              <Doctors />
            </>
          }
        />
        <Route
          path="/book-doctor"
          element={
            <>
              <Header />
              <BookDoctorPage />
            </>
          }
        />
        <Route
          path="/search-hospitals"
          element={
            <>
              <Header />
              <SearchHospitals />
            </>
          }
        />
        <Route
          path="/find-hospitals"
          element={
            <>
              <Header />
              <FindHospitalsPage />
            </>
          }
        />
        <Route
          path="/symptom-checker"
          element={
            <>
              <Header />
              <SymtomChecker />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;