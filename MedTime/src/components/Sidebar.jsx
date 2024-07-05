import iconHome from '../assets/images/icon-home.svg';
import iconNotification from '../assets/images/icon-notification.svg';
import iconProfile from '../assets/images/icon-profile.svg';
import iconBookmark from '../assets/images/icon-bookmark.svg';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <button className="sidebar-icon">
        <img src={iconHome} alt="Home" />
      </button>
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
  );
}

export default Sidebar;