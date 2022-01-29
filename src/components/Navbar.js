import React from "react";
import { useUserContext } from "../context/UserContext.js";
import { NavLink } from "react-router-dom";
import { image } from "./Dashboard"

const Navbar = () => {
    const { user, logoutUser } = useUserContext();

    return (
        <div className="bg-white">
          <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <NavLink to="/">
                      <h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">ARC</h1>
                    </NavLink>
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex space-x-8">
                    <NavLink
                      to="dashboard"
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 transition duration-150 ease-in-out"
                    >
                      Dashboard
                    </NavLink>
                    <NavLink 
                      to="exercises"
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 transition duration-150 ease-in-out"
                    >
                      Exercises
                    </NavLink>
                  </div>
                </div>
                <div className="flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 transition duration-150 ease-in-out">
                  <NavLink to="dashboard">
                      <img className="inline object-cover w-8 h-8 rounded-full mr-2" src={ user.photoURL ? user.photoURL : "https://us.123rf.com/450wm/kritchanut/kritchanut1308/kritchanut130800064/21738699-zdj%C4%99cie-profilowe-cz%C5%82owiek-avatar-wektor.jpg?ver=6"} alt="Profile image"/>
                  </NavLink>
                  <span className="ml-auto cursor-pointer" onClick={logoutUser}>Log out</span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      );
};

export default Navbar;