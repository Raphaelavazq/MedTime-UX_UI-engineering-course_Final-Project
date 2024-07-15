// Home.jsx parallsx 
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import { Link, Element } from 'react-scroll';
import { motion } from 'framer-motion';
import './Home.css';
import image1 from '../assets/images/1.gif';
import image2 from '../assets/images/2.gif';
import image3 from '../assets/images/3.gif';
import image4 from '../assets/images/4.gif';

const sections = [
  {
    name: 'section1',
    bgColor: 'bg-yellow-100',
    title: 'Welcome to Healthcare App',
    subtitle: 'Your one-stop solution for all healthcare needs.',
    image: image1,
  },
  {
    name: 'section2',
    bgColor: 'bg-yellow-50',
    title: 'Find Hospitals, Pharmacies, and Doctors',
    subtitle: 'Locate the best healthcare providers near you.',
    image: image2,
  },
  {
    name: 'section3',
    bgColor: 'bg-yellow-500',
    title: 'Book Appointments Easily',
    subtitle: 'Schedule your appointments with ease.',
    image: image3,
  },
  {
    name: 'section4',
    bgColor: 'bg-background',
    title: 'Symptom Checker and More',
    subtitle: 'Get instant health advice and more.',
    image: image4,
  },
];

const Home = () => {
  return (
    <ParallaxProvider>
      <div>
        <nav className="nav container mx-auto p-4 flex justify-between">
          <div className="font-bold text-xl">Healthcare App</div>
          <div className="nav-links">
            {sections.map((section, index) => (
              <Link key={index} to={section.name} smooth={true} duration={500}>
                {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
              </Link>
            ))}
          </div>
        </nav>

        {sections.map((section, index) => (
          <Element key={index} name={section.name} className={`section ${section.bgColor}`}>
            <ParallaxBanner
              layers={[
                {
                  image: section.image,
                  amount: 0.2,
                },
                {
                  children: (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <h1 className="section-title">{section.title}</h1>
                      <p className="section-subtitle">{section.subtitle}</p>
                    </motion.div>
                  ),
                  amount: 0.5,
                },
              ]}
              style={{ height: '100vh' }}
            />
          </Element>
        ))}
      </div>
    </ParallaxProvider>
  );
};

export default Home;

// Home.jsx before with cards  