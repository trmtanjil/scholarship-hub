import { Link, NavLink } from "react-router";
import Scholarshiplogo from "../../Scholarshiplogo/Scholarshiplogo";
import useAuth from "../../hoocks/useAuth";
import Logout from "../Authentication/Logout/Logout";
import useUserRole from "../../hoocks/useUserRole";
import ThemeToggle from "../../Page/ThemeTogle/ThemeToggle";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return null;

  

 const navLinks = (
  <>
    <NavLink
      to="/"
      className={({ isActive }) =>
        `relative px-4 py-2 font-medium transition-all duration-300 ${
          isActive
            ? "text-primary"
            : "text-gray-600 hover:text-primary"
        }`
      }
    >
      {({ isActive }) => (
        <>
          Home
          {isActive && (
            <span className="absolute left-1/2 -bottom-1 w-2/3 h-0.5 bg-primary transform -translate-x-1/2 rounded-full transition-all duration-300" />
          )}
          {!isActive && (
            <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-primary transform -translate-x-1/2 rounded-full group-hover:w-2/3 transition-all duration-300" />
          )}
        </>
      )}
    </NavLink>

    <NavLink
      to="/allscholarships"
      className={({ isActive }) =>
        `relative px-4 py-2 font-medium transition-all duration-300 ${
          isActive
            ? "text-primary"
            : "text-gray-600 hover:text-primary"
        }`
      }
    >
      {({ isActive }) => (
        <>
          All Scholarships
          {isActive && (
            <span className="absolute left-1/2 -bottom-1 w-2/3 h-0.5 bg-primary transform -translate-x-1/2 rounded-full transition-all duration-300" />
          )}
          {!isActive && (
            <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-primary transform -translate-x-1/2 rounded-full group-hover:w-2/3 transition-all duration-300" />
          )}
        </>
      )}
    </NavLink>

    {user && role === "user" && (
      <NavLink
        to="/userdashboard"
        className={({ isActive }) =>
          `relative px-4 py-2 font-medium transition-all duration-300 ${
            isActive
              ? "text-primary"
              : "text-gray-600 hover:text-primary"
          }`
        }
      >
        {({ isActive }) => (
          <>
            User Dashboard
            {isActive && (
              <span className="absolute left-1/2 -bottom-1 w-2/3 h-0.5 bg-primary transform -translate-x-1/2 rounded-full transition-all duration-300" />
            )}
            {!isActive && (
              <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-primary transform -translate-x-1/2 rounded-full group-hover:w-2/3 transition-all duration-300" />
            )}
          </>
        )}
      </NavLink>
    )}

    {user && role === "admin" && (
      <NavLink
        to="/admindashboard"
        className={({ isActive }) =>
          `relative px-4 py-2 font-medium transition-all duration-300 ${
            isActive
              ? "text-primary"
              : "text-gray-600 hover:text-primary"
          }`
        }
      >
        {({ isActive }) => (
          <>
            Admin Dashboard
            {isActive && (
              <span className="absolute left-1/2 -bottom-1 w-2/3 h-0.5 bg-primary transform -translate-x-1/2 rounded-full transition-all duration-300" />
            )}
            {!isActive && (
              <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-primary transform -translate-x-1/2 rounded-full group-hover:w-2/3 transition-all duration-300" />
            )}
          </>
        )}
      </NavLink>
    )}

    {user && role === "moderator" && (
      <NavLink
        to="/modaratordashboard"
        className={({ isActive }) =>
          `relative px-4 py-2 font-medium transition-all duration-300 ${
            isActive
              ? "text-primary"
              : "text-gray-600 hover:text-primary"
          }`
        }
      >
        {({ isActive }) => (
          <>
            Moderator Dashboard
            {isActive && (
              <span className="absolute left-1/2 -bottom-1 w-2/3 h-0.5 bg-primary transform -translate-x-1/2 rounded-full transition-all duration-300" />
            )}
            {!isActive && (
              <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-primary transform -translate-x-1/2 rounded-full group-hover:w-2/3 transition-all duration-300" />
            )}
          </>
        )}
      </NavLink>
    )}
  </>
);


  return (
    <header className="sticky  top-0 z-50 shadow-md   ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Scholarshiplogo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6   font-medium text-base">
          {navLinks}
          <div className="mx-2">
            <ThemeToggle />
          </div>
          <Logout />
        </nav>

        {/* Mobile Dropdown */}
        <div className="md:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle text-gray-700 dark:text-white">
            <FiMenu className="w-6 h-6" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow bg-white dark:bg-gray-800 rounded-box w-56 text-gray-700 dark:text-white space-y-2"
          >
            {navLinks}
            <li><ThemeToggle /></li>
            <li><Logout /></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
