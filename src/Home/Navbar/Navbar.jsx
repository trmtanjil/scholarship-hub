import { Link } from "react-router";

const Navbar = () => {
  const user = true; // Dummy user, pore firebase auth er sathe replace korba
  const isAdmin = false; // Dummy admin role
  const isModerator = false; // Dummy moderator role


 
  return (




    <div className="navbar bg-white shadow-lg px-6 py-3 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🎓 ScholarFinder
        </Link>
      </div>

      {/* Menu Links */}
      <div className="flex-none hidden md:flex gap-6 items-center text-lg font-medium text-gray-700">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/all-scholarships" className="hover:text-blue-500">All Scholarship</Link>

        {/* Conditional Dashboard Links */}
        {user && <Link to="/userdashboard" className="hover:text-blue-500">User Dashboard</Link>}
        {isAdmin && <Link to="/dashboard/admin" className="hover:text-blue-500">Admin Dashboard</Link>}
        {isModerator && <Link to="/dashboard/moderator" className="hover:text-blue-500">Moderator Dashboard</Link>}

        {/* Login/Logout */}
        {user ? (
          <button className="btn btn-outline btn-sm border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-outline btn-sm border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
            Login
          </Link>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="dropdown dropdown-end md:hidden">
        <label tabIndex={0} className="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-white rounded-box w-52 space-y-2">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all-scholarships">All Scholarship</Link></li>
          {user && <li><Link to="/userdashboard">User Dashboard</Link></li>}
          {isAdmin && <li><Link to="/dashboard/admin">Admin Dashboard</Link></li>}
          {isModerator && <li><Link to="/dashboard/moderator">Moderator Dashboard</Link></li>}
          {user ? <li><button>Logout</button></li> : <li><Link to="/login">Login</Link></li>}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
