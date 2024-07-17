import PropTypes from 'prop-types';
import hamburgerIcon from '../assets/images/hamburger-icon.svg';

const HamburguerMenu = ({ onClick }) => {
  return (
    <button onClick={onClick} className="hamburger-menu">
      <img src={hamburgerIcon} alt="Hamburger Icon" width={24} height={24} />
    </button>
  );
};

HamburguerMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HamburguerMenu;