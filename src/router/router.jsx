
import { createBrowserRouter} from "react-router";
import RootLayOut from "../RootLayOut/RootLayOut";
import Home from "../Home/Home/Home";
 
export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayOut,
    children:[
        {
            index:true,
            Component:Home,
        },
   
    ]
 },

]);