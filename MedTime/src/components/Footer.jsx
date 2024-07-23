import { FaTwitter, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const socials = [
  { id: 1, url: 'https://twitter.com', icon: <FaTwitter />, title: 'Twitter' },
  { id: 2, url: 'https://www.facebook.com', icon: <FaFacebookF />, title: 'Facebook' },
  { id: 3, url: 'https://github.com', icon: <FaGithub />, title: 'Github' },
  { id: 4, url: 'https://www.linkedin.com', icon: <FaLinkedinIn />, title: 'LinkedIn' }
];


const Footer = () => {
  return (
    <footer className="bg-blue-600 fixed  text-white font-semibold py-4  bottom-0 left-0 w-full ">
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 mx-auto max-w-7xl">
        <p className="text-center sm:text-left mb-2 sm:mb-0 text-sm">
          © {new Date().getFullYear()}. All rights reserved.
        </p>
        <ul className="flex gap-3">
          {socials.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full transition-colors hover:bg-yellow-600"
              >
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;