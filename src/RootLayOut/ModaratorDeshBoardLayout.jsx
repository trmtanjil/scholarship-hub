import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Scholarshiplogo from '../Scholarshiplogo/Scholarshiplogo';
import { BiHome } from 'react-icons/bi';
import { FaUserCircle, FaRegListAlt, FaClipboardList, FaPlusCircle, FaComments } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

function ModeratorDashboardLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      {/* Main Content Area */}
      <div className="drawer-content flex flex-col bg-gray-500">
        {/* Mobile Navbar */}
        <div className="navbar bg-white shadow-sm w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-ghost btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-lg font-semibold text-gray-700">
            <MdDashboard className="inline-block mr-2" />
            Moderator Dashboard
          </div>
        </div>
        
        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6">
          <Outlet />
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        
        <aside className="menu bg-gradient-to-b from-purple-800 to-purple-900 text-white min-h-full w-80 p-0">
          {/* Logo Section */}
          <div className="p-6 border-b border-purple-700">
            <Scholarshiplogo className="text-white" />
          </div>
          
          {/* Navigation Menu */}
          <nav className="p-4 space-y-2">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-purple-700 text-white shadow-md' : 'hover:bg-purple-700/50'}`
              }
            >
              <BiHome className="w-5 h-5 mr-3" />
              <span>Home</span>
            </NavLink>
            
            <NavLink 
              to="/modaratordashboard/amaddscholership"
              className={({isActive}) => 
                `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-purple-700 text-white shadow-md' : 'hover:bg-purple-700/50'}`
              }
            >
              <FaPlusCircle className="w-5 h-5 mr-3" />
              <span>Add Scholarship</span>
            </NavLink>
            
            <NavLink 
              to="/modaratordashboard/modaratorProfile"
              className={({isActive}) => 
                `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-purple-700 text-white shadow-md' : 'hover:bg-purple-700/50'}`
              }
            >
              <FaUserCircle className="w-5 h-5 mr-3" />
              <span>Moderator Profile</span>
            </NavLink>
            
            <NavLink 
              to="/modaratordashboard/mmgSlrspModarator"
              className={({isActive}) => 
                `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-purple-700 text-white shadow-md' : 'hover:bg-purple-700/50'}`
              }
            >
              <FaRegListAlt className="w-5 h-5 mr-3" />
              <span>Manage Scholarships</span>
            </NavLink>
            
            <NavLink 
              to="/modaratordashboard/allreviewsMod"
              className={({isActive}) => 
                `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-purple-700 text-white shadow-md' : 'hover:bg-purple-700/50'}`
              }
            >
              <FaComments className="w-5 h-5 mr-3" />
              <span>Manage Reviews</span>
            </NavLink>
            
            <NavLink 
              to="/modaratordashboard/allappliedSlspMdtr"
              className={({isActive}) => 
                `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-purple-700 text-white shadow-md' : 'hover:bg-purple-700/50'}`
              }
            >
              <FaClipboardList className="w-5 h-5 mr-3" />
              <span>Applications</span>
            </NavLink>
          </nav>
        </aside>
      </div>
    </div>
  );
}

export default ModeratorDashboardLayout;