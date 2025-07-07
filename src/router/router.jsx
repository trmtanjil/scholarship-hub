
import { createBrowserRouter} from "react-router";
import RootLayOut from "../RootLayOut/RootLayOut";
import Home from "../Home/Home/Home";
import UserDeshBoardLayout from "../RootLayOut/UserDeshBoardLayout";
import ModaratorDeshBoardLayout from "../RootLayOut/ModaratorDeshBoardLayout";
import AdminDeshBoardLayout from "../RootLayOut/AdminDeshBoardLayout";
import AllScholerShip from "../Home/AllScholerShip/AllScholerShip";
 
 
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
    
  
  ]
 },

 //admin desh board 
  {
  path:'/admindashboard',
  element:<AdminDeshBoardLayout></AdminDeshBoardLayout>,
  children:[
    
  
  ]
 },


]);