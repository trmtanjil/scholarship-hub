import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Home/Navbar/Navbar'

function RootLayOut() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>

    </div>
  )
}

export default RootLayOut