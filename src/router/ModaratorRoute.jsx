import React from 'react'
import useAuth from '../hoocks/useAuth'
import useUserRole from '../hoocks/useUserRole'
import LoadingId from '../Page/Loading/Loading'
import { Navigate } from 'react-router'

function ModaratorRoute({children}) {
  const {user, loading} =useAuth()
    const {role, roleLoading}= useUserRole()

    if(loading || roleLoading){
        return <LoadingId></LoadingId>
    }
    if(!user || role !=='moderator'){
         return <Navigate  state={{from: location.pathname}} to='/forbidden' replace  ></Navigate>
    }





  return children
}

export default ModaratorRoute