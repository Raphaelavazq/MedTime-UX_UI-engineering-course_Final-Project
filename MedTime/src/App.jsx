import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Hospital from './pages/Hospital';
import Pharmacy from './pages/Pharmacy'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/pharmacy" element={<Pharmacy />} /> 
      </Routes>
    </Router>
  );
}

export default App;