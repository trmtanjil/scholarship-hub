import React, { use } from 'react'
import { AutContext } from '../Contexts/AuthContexts/AutContext'
 
 
function useAuth() {
  const authInfo = use(AutContext)
  console.log(authInfo)
  return authInfo
  
}

export default useAuth