import PropTypes from 'prop-types';

const ToggleComponent = ({ setIsActive }) => {
  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  return (
    <div className="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out rounded-br-full z-1000">
      <div className="toggle bg-blue-600 h-full text-white relative -left-full w-200p transform transition-transform duration-600 ease-in-out">
        <div className="toggle-panel absolute w-1/2 h-full flex items-center justify-center flex-col px-8 text-center top-0 transform transition-transform duration-600 ease-in-out -translate-x-full">
          <h1>Welcome Back!</h1>
          <p>Enter your personal details to use all of site features</p>
          <button className="bg-transparent border border-white text-white py-2 px-6 rounded-lg mt-4" onClick={handleLoginClick}>Sign In</button>
        </div>
        <div className="toggle-panel absolute w-1/2 h-full flex items-center justify-center flex-col px-8 text-center top-0 right-0 transform transition-transform duration-600 ease-in-out">
          <h1>Hello, Friend!</h1>
          <p>Register with your personal details to use all of site features</p>
          <button className="bg-transparent border border-white text-white py-2 px-6 rounded-lg mt-4" onClick={handleRegisterClick}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

ToggleComponent.propTypes = {
  setIsActive: PropTypes.func.isRequired,
};

export default ToggleComponent;