import React from 'react';
import Scholarshiplogo from '../Scholarshiplogo/Scholarshiplogo';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router';
import { BiHome, BiPackage, BiUserCircle } from 'react-icons/bi';
import { MdSchool, MdOutlineAnalytics } from 'react-icons/md';
import { FaClipboardList, FaStar, FaUsersCog } from 'react-icons/fa';

function AdminDeshBoardLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      {/* Main Content Area */}
      <div className="drawer-content flex flex-col bg-gray-500">
        {/* Mobile Navbar */}
        <div className="navbar bg-white shadow-sm w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-ghost btn-square"
            >
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
          <div className="flex-1 px-2 mx-2 text-lg font-semibold text-gray-700">Admin Dashboard</div>
        </div>
        
        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6">
          <Outlet />
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        
        <aside className="menu bg-gradient-to-b from-purple-800 to-purple-900 text-white min-h-full w-80 p-0">
          {/* Logo Section */}
          <div className="p-6 border-b border-blue-700">
            <Scholarshiplogo className="text-white" />
          </div>
          
          {/* Navigation Menu */}
          <nav className="p-4">
            <ul className="space-y-1">
              <li>
                <NavLink 
                  to="/" 
                  className={({isActive}) => 
                    `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700/50'}`
                  }
                >
                  <BiHome className="w-5 h-5 mr-3" />
                  <span>Home</span>
                </NavLink>
              </li>
              
              <li>
                <NavLink 
                  to="/admindashboard/addminaprofile"
                  className={({isActive}) => 
                    `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700/50'}`
                  }
                >
                  <BiUserCircle className="w-5 h-5 mr-3" />
                  <span>Admin Profile</span>
                </NavLink>
              </li>
              
              <li>
                <NavLink 
                  to="/admindashboard/addminaddscholaship"
                  className={({isActive}) => 
                    `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700/50'}`
                  }
                >
                  <BiPackage className="w-5 h-5 mr-3" />
                  <span>Add Scholarship</span>
                </NavLink>
              </li>
              
              <li>
                <NavLink 
                  to="/admindashboard/managescholarships"
                  className={({isActive}) => 
                    `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700/50'}`
                  }
                >
                  <MdSchool className="w-5 h-5 mr-3" />
                  <span>Manage Scholarships</span>
                </NavLink>
              </li>
              
              <li>
                <NavLink 
                  to="/admindashboard/allappliedSlspMdtr"
                  className={({isActive}) => 
                    `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700/50'}`
                  }
                >
                  <FaClipboardList className="w-5 h-5 mr-3" />
                  <span>Manage Applications</span>
                </NavLink>
              </li>
              
              <li>
                <NavLink 
                  to="/admindashboard/manageusers"
                  className={({isActive}) => 
                    `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700/50'}`
                  }
                >
                  <FaUsersCog className="w-5 h-5 mr-3" />
                  <span>Manage Users</span>
                </NavLink>
              </li>
              
              <li>
                <NavLink 
                  to="/admindashboard/allreviewsMod"
                  className={({isActive}) => 
                    `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700/50'}`
                  }
                >
                  <FaStar className="w-5 h-5 mr-3" />
                  <span>Manage Reviews</span>
                </NavLink>
              </li>
              
              <li>
                <NavLink 
                  to="/admindashboard/analyticsChartpage"
                  className={({isActive}) => 
                    `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700/50'}`
                  }
                >
                  <MdOutlineAnalytics className="w-5 h-5 mr-3" />
                  <span>Analytics Dashboard</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}

export default AdminDeshBoardLayout;