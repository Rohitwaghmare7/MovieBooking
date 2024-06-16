import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Notification from "./Alert";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setNotification({ message: "Logged out successfully", type: "success" });
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="py-2">
      <div className="mx-auto">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center ml-0">
            <Link className="flex items-center" to="/home">
              <h1 className="text-5xl font-bold text-gradient ml-0 text-gray-800">BMS</h1>
            </Link>
          </div>
          <div className="flex items-center mr-0">
            <button
              className="text-gray-800 focus:outline-none mr-0"
              onClick={toggleMenu}
            >
              {menuOpen ? (
                <FaTimes className="w-8 h-8" style={{ color: "gray" }} />
              ) : (
                <FaBars className="w-8 h-8" style={{ color: "gray" }} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 w-64 bg-gray-900 h-full shadow-lg transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <FaTimes className="w-6 h-6 " style={{ color: "white" }} />
            </button>
          </div>

          <Link to="/bookings" className="mt-4 text-blue-500 block text-white">
            Your Bookings
          </Link>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}

export default Navbar;
