import React from 'react'
import { Outlet } from 'react-router'
 
import Scholarshiplogo from '../Scholarshiplogo/Scholarshiplogo'

function AthenticationLayOut() {
  return (
    <div className="bg-base-200">
        <div>
            <Scholarshiplogo></Scholarshiplogo>
        </div>
      
  <div className="hero-content flex-col lg:flex-row-reverse ">
      
    <div className='flex-1'>
      <Outlet></Outlet>
    </div>
  </div>
</div>
  )
}

export default AthenticationLayOut