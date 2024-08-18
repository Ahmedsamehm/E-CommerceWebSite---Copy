import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

export default function ProtectedAuthRoute({children}) {
    const {UserToken}=useContext(AuthContext)
  return (
      <>
      
      {UserToken ==""?children:<Navigate to={"/"}></Navigate>}
      
      
      </>
  )
}
