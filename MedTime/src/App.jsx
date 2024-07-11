import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hospital from './pages/Hospital';
import Pharmacy from './pages/Pharmacy';
import Doctors from './pages/Doctors';
import BookDoctorPage from './pages/BookDoctorPage'; // Import the new page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/doctor" element={<Doctors />} />
        <Route path="/book-doctor" element={<BookDoctorPage />} /> {/* Add the new route */}
      </Routes>
    </Router>
  );
};

export default App;