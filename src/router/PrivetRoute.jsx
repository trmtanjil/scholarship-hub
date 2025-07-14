import React from 'react';
 import { Navigate, useLocation } from 'react-router';
import useAuth from '../hoocks/useAuth';

const PrivetRoute = ({children}) => {
 const {user, loading} = useAuth();
 const location = useLocation()


 if(loading){
  return <p>loading.....</p>
 }
 if(!user){
  return <Navigate to='/login' state={{from: location.pathname}} replace ></Navigate>
 }


  return  children;
};

export default PrivetRoute;