import PropTypes from 'prop-types';
import searchIcon from '../assets/images/icon-search.svg';
import './Search.css';

const Search = ({ postcode, setPostcode, handleKeyPress, handleSearch, placeholderText, headerText }) => (
  <div className="search-container">
    <div className="search-bar-container">
      <input
        type="text"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        onKeyPress={handleKeyPress}
        className="postcode-input"
        placeholder={placeholderText}
      />
      <img src={searchIcon} alt="Search" className="search-icon" onClick={handleSearch} />
    </div>
    <h1>{headerText}</h1>
  </div>
);

Search.propTypes = {
  postcode: PropTypes.string.isRequired,
  setPostcode: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  placeholderText: PropTypes.string, // Add prop type for placeholder text
  headerText: PropTypes.string.isRequired, // Add prop type for header text
};

Search.defaultProps = {
  placeholderText: 'Enter postcode...', // Default placeholder text
};

export default Search;