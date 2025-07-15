import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Home/Navbar/Navbar'
import Footer from '../Page/Footer/Footer'

function RootLayOut() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>

    </div>
  )
}

export default RootLayOut