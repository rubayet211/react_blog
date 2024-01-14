import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is undefined, make sure you're using the AuthContexProvider");
  }

  const { currentUser, logout } = authContext;

  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-purple-600 w-full">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img className="w-10 h-10 rounded-full scale-150" src={Logo} alt="Logo" />
        </Link>
        <div className="space-x-2">
          <Link className="text-white hover:text-gray-300" to="/?cat=art">ART</Link>
          <Link className="text-white hover:text-gray-300" to="/?cat=science">SCIENCE</Link>
          <Link className="text-white hover:text-gray-300" to="/?cat=technology">TECHNOLOGY</Link>
          <Link className="text-white hover:text-gray-300" to="/?cat=cinema">CINEMA</Link>
          <Link className="text-white hover:text-gray-300" to="/?cat=design">DESIGN</Link>
          <Link className="text-white hover:text-gray-300" to="/?cat=food">FOOD</Link>
        </div>
      </div>
      <div className="space-x-2">
        <span className="text-white">{currentUser?.username}</span>
        {currentUser ? (
          <span className="text-white cursor-pointer hover:text-gray-300" onClick={() => logout()}>Logout</span>
        ) : (
          <Link className="text-white hover:text-gray-300" to="/login">Login</Link>
        )}
        <span className="text-white">
          <Link className="text-white hover:text-gray-300" to="/write">Write</Link>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
