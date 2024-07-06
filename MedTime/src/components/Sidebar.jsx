import { useState } from 'react'; // Import useState from React
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import iconHome from '../assets/images/icon-home.svg';
import iconNotification from '../assets/images/icon-notification.svg';
import iconProfile from '../assets/images/icon-profile.svg';
import iconBookmark from '../assets/images/icon-bookmark.svg';
import hamburgerIcon from '../assets/images/hamburger-icon.svg';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="hamburger-icon" onClick={toggleSidebar}>
        <img src={hamburgerIcon} alt="Menu" />
      </button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="sidebar-icon">
          <img src={iconHome} alt="Home" />
        </Link>
        <button className="sidebar-icon">
          <img src={iconNotification} alt="Notifications" />
        </button>
        <button className="sidebar-icon">
          <img src={iconProfile} alt="Profile" />
        </button>
        <button className="sidebar-icon">
          <img src={iconBookmark} alt="Bookmark" />
        </button>
      </aside>
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;