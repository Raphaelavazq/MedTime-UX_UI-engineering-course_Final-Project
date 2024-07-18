import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { useState } from 'react';
import { FaHeartbeat } from 'react-icons/fa';
import Button from './Button';
import hamburgerIcon from '../assets/images/hamburguer-icon.png';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const navigate = useNavigate();

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };



  const navigation = [
    { id: 1, title: 'Hospitals', url: '/hospital' },
    { id: 2, title: 'Pharmacies', url: '/pharmacy' },
    { id: 3, title: 'Book Appointments', url: '/doctor' },
    { id: 4, title: 'Symptom Checker', url: '/symptom-checker' },
  ];

  return (
    <div className={` fixed top-0 left-0 w-full z-50 bg-[#2462ea] py-6`}>
      <div className="flex items-center px-5 lg:px-10">
        <a className="text-white text-4xl font-bold flex items-center logo no-hover" href="/">
          <div className="logo-icon-bg mr-2">
            <FaHeartbeat className="gradient-icon text-5xl" />
          </div>
          Med<span className="text-[#fac007]">Time</span>
        </a>

        <nav className={`${openNavigation ? 'flex' : 'hidden'} fixed top-[5rem] left-0 right-0 bottom-0 bg-[#2462ea] lg:static lg:flex lg:mx-auto`}>
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative text-white text-2xl font-bold transition-colors hover:text-[#fac007] px-6 py-6 lg:px-8 lg:py-2 lg:text-lg lg:hover:text-[#fac007]`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav>

        <Button
          className="hidden lg:flex text-xl font-bold"
          style={{
            backgroundColor: 'white',
            color: '#2462ea',
            border: '2px solid yellow',
          }}
          onClick={handleLoginClick}
        >
          Sign in
        </Button>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <img src={hamburgerIcon} alt="Hamburger Menu" className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
