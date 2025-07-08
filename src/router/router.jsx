
import { createBrowserRouter} from "react-router";
import RootLayOut from "../RootLayOut/RootLayOut";
import Home from "../Home/Home/Home";
import UserDeshBoardLayout from "../RootLayOut/UserDeshBoardLayout";
import ModaratorDeshBoardLayout from "../RootLayOut/ModaratorDeshBoardLayout";
import AdminDeshBoardLayout from "../RootLayOut/AdminDeshBoardLayout";
import AllScholerShip from "../Home/AllScholerShip/AllScholerShip";
import AdminAddScholarship from "../Page/AdminAddScholarship/A_M_AddScholarship";
import AthenticationLayOut from "../RootLayOut/AthenticationLayOut";
import Login from "../Home/Authentication/Login/Login";
import RegisterForm from "../Home/Authentication/Register/Register";
import A_M_AddScholarship from "../Page/AdminAddScholarship/A_M_AddScholarship";
import ScholarshipDetails from "../Page/ScholarshipDetails/ScholarshipDetails";
 
 
export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayOut,
    children:[
        {
            index:true,
            Component:Home,
        },
        {
            path:'all-scholarships',
            Component:AllScholerShip
        }

        
        
    ]
},

//auth lay out 
{
  path:'/',
  Component:AthenticationLayOut,
  children:[
    {
      path:'login',
      Component:Login,
    },
     {
      path:'register',
      Component:RegisterForm,
    },
      {
      path:'sholarshipdetails/:id',
      Component:ScholarshipDetails
    }
  ]
 },



//user deshboard 

  {
  path:'/userdashboard',
  element:<UserDeshBoardLayout></UserDeshBoardLayout>,
  children:[
    
  
  ]
 },
 //modarator desh board 

  {
  path:'/modaratordashboard',
  element:<ModaratorDeshBoardLayout></ModaratorDeshBoardLayout>,
  children:[
    {
      path:'amaddscholership',
      Component:A_M_AddScholarship,
    },
  
  
  ]
 },

 //admin desh board 
  {
  path:'/admindashboard',
  element:<AdminDeshBoardLayout></AdminDeshBoardLayout>,
  children:[
    {
        path:'addminaddscholaship',
        Component:AdminAddScholarship,
    }
  
  ]
 },


]);