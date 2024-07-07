import PropTypes from 'prop-types';
import searchIcon from '../assets/images/icon-search.svg';
import './Search.css';

const Search = ({ postcode, setPostcode, handleKeyPress, handleSearch }) => (
  <div className="search-container">
    <div className="search-bar-container">
      <input
        type="text"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        onKeyPress={handleKeyPress}
        className="postcode-input"
        placeholder="Insert your postcode here"
      />
      <img src={searchIcon} alt="Search" className="search-icon" onClick={handleSearch} />
    </div>
    <h1>LET&apos;S FIND YOU A<span className="highlight">  Hospital</span></h1>
  </div>
);

Search.propTypes = {
  postcode: PropTypes.string.isRequired,
  setPostcode: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Search;