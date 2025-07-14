import React, { Children } from 'react'
import useAuth from '../hoocks/useAuth'
import useUserRole from '../hoocks/useUserRole'
 import { Navigate } from 'react-router'
import LoadingId from '../Page/Loading/Loading'

function AdminRoute({children}) {
    const {user, loading} =useAuth()
    const {role, roleLoading}= useUserRole()

    if(loading || roleLoading){
        return <LoadingId></LoadingId>
    }
    if(!user || role !=='admin'){
         return <Navigate  state={{from: location.pathname}} to='/forbidden' replace  ></Navigate>
    }





  return children
}

export default AdminRoute