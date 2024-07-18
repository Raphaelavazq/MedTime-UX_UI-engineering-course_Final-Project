import Chatbot from '../components/Chatbot';
import './SymptomChecker.css';

const SymptomChecker = () => {
  return (
    <div className="symptom-checker">
      <h1>Symptom Checker</h1>
      <div className="chatbot-container">
        <Chatbot />
      </div>
    </div>
  );
};

export default SymptomChecker