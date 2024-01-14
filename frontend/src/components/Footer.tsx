import React from "react";
import Logo from "../img/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-purple-600">
      <img className="w-10 h-10 mr-2 rounded-full" src={Logo} alt="Logo" />
      <span className="text-white">
        Made with <span className="text-pink-400">♥️</span> and <b className="font-bold">React.js</b>.
      </span>
    </footer>
  );
};

export default Footer;
