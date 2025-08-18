import { createBrowserRouter } from "react-router";
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
import Payment from "../Page/Payment/Payment";
import AllScholarships from "../Page/AllScholarships/AllScholarships";
import MyApplication from "../Page/MyApplication/MyApplication";
import MyProfile from "../Page/MyProfile/MyProfile";
import MyReviews from "../Page/Myreviews/Myreviews";
import EditApplication from "../Page/EditApplication/EditApplication";
import ModaratorProfile from "../Page/Modarator/ModaratorProfile";
import MmgSlrspModarator from "../Page/Modarator/MmgSlrspModarator";
import AllreviewsMod from "../Page/Modarator/AllreviewsMod";
import AllappliedSlspMdtr from "../Page/Modarator/AllappliedSlspMdtr";
import AddScholarshipMrtr from "../Page/Modarator/AddScholarshipMrtr";
import EditScholarshipForm from "../Page/EditScholaship/EditScholar";
import EditScholar from "../Page/EditScholaship/EditScholar";
import ManageScholarships from "../Page/Modarator/MmgSlrspModarator";
import Manageusers from "../Page/Admin/Manageusers";
import Managereviews from "../Page/Admin/Managereviews";
import Manageapplications from "../Page/Admin/Manageapplications";
import AdminProfile from "../Page/Admin/AdminProfile";
import PrivetRoute from "./PrivetRoute";
import AdminRoute from "./AdminRoute";
import Forbidden from "../Page/Forbidden/Forbidden";
import AnalyticsChartpage from "../Page/Admin/AnalyticsChartpage";
import ModaratorRoute from "./ModaratorRoute";
import Error from "../Page/Error/Error";
import About from "../Page/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-scholarships",
        Component: AllScholerShip,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "allscholarships",
        Component: AllScholarships,
      },
      {
        path:'about',
        Component:About
      }
    ],
  },

  //auth lay out
  {
    path: "/",
    Component: AthenticationLayOut,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: RegisterForm,
      },
      {
        path: "sholarshipdetails/:id",
        element: (
           
            <ScholarshipDetails></ScholarshipDetails>
         
        ),
      },
    ],
  },

  //user deshboard

  {
    path: "/userdashboard",
    element: (
      <PrivetRoute>
        <UserDeshBoardLayout></UserDeshBoardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        path: "checkout/:scholarId",
        element: <Payment />, // এটা ঠিক ✅
      },
      {
        path: "myapplication",
        Component: MyApplication,
      },
      {
        path: "myprofile",
        Component: MyProfile,
      },
      {
        path: "myreveiw",
        Component: MyReviews,
      },

      {
        path: "edit-application/:id",
        Component: EditApplication,
      },
    ],
  },
  //modarator desh board

  {
    path: "/modaratordashboard",
    element: (
      <ModaratorRoute>
        <PrivetRoute>
          {" "}
          <ModaratorDeshBoardLayout></ModaratorDeshBoardLayout>
        </PrivetRoute>
      </ModaratorRoute>
    ),
    children: [
      {
        path: "amaddscholership",
        Component: A_M_AddScholarship,
      },
      {
        path: "modaratorProfile",
        Component: ModaratorProfile,
      },
      {
        path: "mmgSlrspModarator",
        Component: MmgSlrspModarator,
      },
      {
        path: "allreviewsMod",
        Component: AllreviewsMod,
      },
      {
        path: "allappliedSlspMdtr",
        Component: AllappliedSlspMdtr,
      },

      {
        path: "editScholarship/:id",
        Component: EditScholar,
      },
    ],
  },

  //admin desh board
  {
    path: "/admindashboard",
    element: (
      <AdminRoute>
        <PrivetRoute>
          <AdminDeshBoardLayout></AdminDeshBoardLayout>
        </PrivetRoute>
      </AdminRoute>
    ),
    children: [
      {
        path: "addminaddscholaship",
        Component: AdminAddScholarship,
      },
      {
        path: "allappliedSlspMdtr",
        Component: AllappliedSlspMdtr,
      },
      {
        path: "manageusers",
        Component: Manageusers,
      },
      {
        path: "managescholarships",
        Component: ManageScholarships,
      },
      {
        path: "allreviewsMod",
        Component: AllreviewsMod,
      },
      {
        path: "addminaprofile",
        Component: AdminProfile,
      },
      {
        path: "analyticsChartpage",
        Component: AnalyticsChartpage,
      },
    ],
  },

  {
    path: "/*",
    element: <Error></Error>,
  },
]);
