import { useState } from 'react';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import ToggleComponent from '../components/ToggleComponent';
import './AuthenticationPage.css';

const AuthenticationPage = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form className="flex flex-col items-center justify-center p-10 h-full">
          <h1 className="text-3xl font-bold mb-4">Create Account</h1>
          <div className="social-icons flex space-x-4 my-4">
            <a href="#" className="icon p-2 border border-gray-300 rounded-full"><FaGooglePlusG /></a>
            <a href="#" className="icon p-2 border border-gray-300 rounded-full"><FaFacebookF /></a>
            <a href="#" className="icon p-2 border border-gray-300 rounded-full"><FaGithub /></a>
            <a href="#" className="icon p-2 border border-gray-300 rounded-full"><FaLinkedinIn /></a>
          </div>
          <span className="text-sm mb-4">or use your email for registration</span>
          <input type="text" placeholder="Name" className="bg-gray-200 border-none my-2 py-2 px-4 rounded-lg w-full" />
          <input type="email" placeholder="Email" className="bg-gray-200 border-none my-2 py-2 px-4 rounded-lg w-full" />
          <input type="password" placeholder="Password" className="bg-gray-200 border-none my-2 py-2 px-4 rounded-lg w-full" />
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-4 hover:bg-white hover:text-blue-600 border-2 border-blue-600 transition">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form className="flex flex-col items-center justify-center p-10 h-full">
          <h1 className="text-3xl font-bold mb-4">Sign In</h1>
          <div className="social-icons flex space-x-4 my-4">
            <a href="#" className="icon p-2 border border-gray-300 rounded-full"><FaGooglePlusG /></a>
            <a href="#" className="icon p-2 border border-gray-300 rounded-full"><FaFacebookF /></a>
            <a href="#" className="icon p-2 border border-gray-300 rounded-full"><FaGithub /></a>
            <a href="#" className="icon p-2 border border-gray-300 rounded-full"><FaLinkedinIn /></a>
          </div>
          <span className="text-sm mb-4">or use your email account</span>
          <input type="email" placeholder="Email" className="bg-gray-200 border-none my-2 py-2 px-4 rounded-lg w-full" />
          <input type="password" placeholder="Password" className="bg-gray-200 border-none my-2 py-2 px-4 rounded-lg w-full" />
          <a href="#" className="text-sm my-2">Forgot Your Password?</a>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-4 hover:bg-white hover:text-blue-600 border-2 border-blue-600 transition">Sign In</button>
        </form>
      </div>
      <ToggleComponent setIsActive={setIsActive} />
    </div>
  );
};

export default AuthenticationPage;