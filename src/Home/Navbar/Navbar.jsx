import { Link } from "react-router"; 
import Scholarshiplogo from "../../Scholarshiplogo/Scholarshiplogo";
import useAuth from "../../hoocks/useAuth";
import Logout from "../Authentication/Logout/Logout";
import useUserRole from "../../hoocks/useUserRole";

const Navbar = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return null; // অথবা <LoadingSpinner /> চাইলে

  return (
    <div className="navbar bg-white shadow-lg px-6 py-3 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex-1">
        <Scholarshiplogo />
      </div>

      {/* Menu Links */}
      <div className="flex-none hidden md:flex gap-6 items-center text-lg font-medium text-gray-700">
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link to="/allscholarships" className="hover:text-blue-500">
          All Scholarship
        </Link>

        {/* Dashboard Links by Role */}
        {user && role === "user" && (
          <Link to="/userdashboard" className="hover:text-blue-500">
            User Dashboard
          </Link>
        )}
        {user && role === "admin" && (
          <Link to="/admindashboard" className="hover:text-blue-500">
            Admin Dashboard
          </Link>
        )}
        {user && role === "moderator" && (
          <Link to="/modaratordashboard" className="hover:text-blue-500">
            Moderator Dashboard
          </Link>
        )}

        {/* Login/Logout */}
        <Logout />
      </div>

      {/* Mobile Dropdown */}
      <div className="dropdown dropdown-end md:hidden">
        <label tabIndex={0} className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-white rounded-box w-52 space-y-2"
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/allscholarships">All Scholarship</Link>
          </li>
          {user && role === "user" && (
            <li>
              <Link to="/userdashboard">User Dashboard</Link>
            </li>
          )}
          {user && role === "admin" && (
            <li>
              <Link to="/admindashboard">Admin Dashboard</Link>
            </li>
          )}
          {user && role === "moderator" && (
            <li>
              <Link to="/modaratordashboard">Moderator Dashboard</Link>
            </li>
          )}

          <Logout />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
