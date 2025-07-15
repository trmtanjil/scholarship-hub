import React from 'react'
import PaginasionToSchola from '../../Page/PaginasionToSchola/PaginasionToSchola'
import Slider from '../../Page/Slider/Slider'
import HowThisWork from '../../Page/HowThisWork/HowThisWork'
import StudentSay from '../../Page/SudentSay/StudentSay'
import Footer from '../../Page/Footer/Footer'
 
function Home() {
  return (
    <div  >
      <Slider></Slider>
      <PaginasionToSchola></PaginasionToSchola>
      <HowThisWork></HowThisWork>
      <StudentSay></StudentSay>
      <Footer></Footer>
     </div>
  )
}

export default Home