import React, { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline"; // Menggunakan icon orang
import Logo from "../assets/Pictures/logodisdukcapil.png";
import SidebarAdmin from "./SidebarAdmin";

const HeaderAdmin = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    // Get admin name from localStorage
    const name = localStorage.getItem("adminName");
    if (name) {
      setAdminName(name);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    window.location.href = "/loginadmin"; // Redirect to login page
  };

  return (
    <div className="fixed top-0 w-full bg-white shadow-md flex justify-between items-center p-4 z-50">
      {/* Logo and Title */}
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-10 mr-3 sm:h-8" />
        <div className="hidden sm:block">
          <h2 className="text-lg font-bold sm:text-base">
            Dinas Kependudukan Dan Pencatatan Sipil
          </h2>
          <p className="text-sm sm:text-xs">Kota Semarang</p>
        </div>
      </div>

      {/* User Information */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none"
        >
          <span className="text-gray-600 mr-3 sm:text-sm">{adminName || "Admin"}</span>
          <UserCircleIcon className="h-10 w-10 text-gray-500 sm:h-8 sm:w-8" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
            <button
              onClick={() => console.log("Akun clicked")}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Akun
            </button>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Sidebar Trigger (optional) */}
      <div className="fixed top-16 left-0 h-full shadow-lg pt-2">
        <SidebarAdmin />
      </div>
    </div>
  );
};

export default HeaderAdmin;
