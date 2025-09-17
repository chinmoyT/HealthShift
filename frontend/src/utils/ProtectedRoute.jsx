import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import localStorageUtils from './localStorage'
import { jwtDecode } from "jwt-decode" 

const ProtectedRoute = () => {
    const token = localStorageUtils.getDecryptedItem("token")

    if(!token) {
        return <Navigate to='/login' replace/>
    }

    try {
    const decoded = jwtDecode(token);

    // Check if expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorageUtils.handleLogout();
      return <Navigate to="/login" replace />;
    }
  } catch (error) {

    localStorageUtils.handleLogout();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />
}

export default ProtectedRoute
