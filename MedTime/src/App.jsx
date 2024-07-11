import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hospital from './pages/Hospital';
import Pharmacy from './pages/Pharmacy';
import Doctors from './pages/Doctors'; // Import Doctors component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/doctor" element={<Doctors />} /> {/* Update this line */}
      </Routes>
    </Router>
  );
};

export default App;