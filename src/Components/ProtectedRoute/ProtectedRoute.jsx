import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login'

export default function ProtectedRoute({ children }) {
  const {UserToken}=useContext(AuthContext)
  return (
    <>
      {
        UserToken?children: <Login/>
    }
    
    </>
  )
}
