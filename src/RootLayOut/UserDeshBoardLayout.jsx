import { NavLink, Outlet } from 'react-router';    
import { BiHome, BiMenu } from 'react-icons/bi';
import { FaUser, FaRegFileAlt } from 'react-icons/fa';
import { MdSchool, MdReviews } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import Scholarshiplogo from '../Scholarshiplogo/Scholarshiplogo';

function UserDeshBoardLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-gray-500">
        {/* Mobile Navbar */}
        <div className="navbar bg-white shadow-sm w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-ghost btn-square">
              <BiMenu className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-xl font-semibold text-gray-700">Dashboard</div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="menu bg-gradient-to-b from-purple-800 to-purple-900 text-white min-h-full w-80 p-0">
          {/* Logo Section */}
          <div className="p-6 border-b border-blue-500">
            <Scholarshiplogo />
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/"
                  className={({isActive}) => 
                    `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-blue-500/30'}`
                  }
                >
                  <BiHome className="w-5 h-5 mr-3" />
                  <span className="font-medium">Home</span>
                </NavLink>
              </li>

              <li>
                <NavLink 
                  to="/userdashboard/myprofile"
                  className={({isActive}) => 
                    `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-blue-500/30'}`
                  }
                >
                  <FaUser className="w-5 h-5 mr-3" />
                  <span className="font-medium">My Profile</span>
                </NavLink>
              </li>

              <li>
                <NavLink 
                  to="/userdashboard/myapplication"
                  className={({isActive}) => 
                    `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-blue-500/30'}`
                  }
                >
                  <FaRegFileAlt className="w-5 h-5 mr-3" />
                  <span className="font-medium">Applications</span>
                </NavLink>
              </li>

              <li>
                <NavLink 
                  to="/userdashboard/myreveiw"
                  className={({isActive}) => 
                    `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-blue-500/30'}`
                  }
                >
                  <MdReviews className="w-5 h-5 mr-3" />
                  <span className="font-medium">My Reviews</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-blue-500">
            <NavLink 
              to="/"
              className="flex items-center p-3 rounded-lg hover:bg-blue-500/30 transition-all"
            >
              <IoSettingsOutline className="w-5 h-5 mr-3" />
              <span className="font-medium">Settings</span>
            </NavLink>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default UserDeshBoardLayout;