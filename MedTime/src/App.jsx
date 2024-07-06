import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Updated path for Home
import Hospital from './pages/Hospital';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospital" element={<Hospital />} />
      </Routes>
    </Router>
  );
}

export default App;