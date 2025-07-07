import React from 'react'
import Scholarshiplogo from '../Scholarshiplogo/Scholarshiplogo'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router'
import { BiHome, BiPackage } from 'react-icons/bi'

function AdminDeshBoardLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
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
          <div className="mx-2 flex-1 px-2 lg:hidden">DeshBoard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <Scholarshiplogo></Scholarshiplogo>
          <li>
            <NavLink to="/">
              <BiHome className="inline-block mr-2" size={18} /> Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/admindashboard/addminaddscholaship">
              <BiPackage className="inline-block mr-2" size={18} />Admin add scholarship
            </NavLink>
          </li>
          
       
        </ul>
      </div>
    </div>
  )
}

export default AdminDeshBoardLayout