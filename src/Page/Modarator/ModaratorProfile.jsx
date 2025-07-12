import React from 'react'
import useAuth from '../../hoocks/useAuth'

function ModaratorProfile() {
 const {user}=useAuth()
 console.log(user)
  return (
    <div>ModaratorProfile</div>
  )
}

export default ModaratorProfile