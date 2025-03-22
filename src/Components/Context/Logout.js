import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'


export default function Logout(props) {
    
    const location = useLocation();

      if (location.pathname === "/login") {
        localStorage.removeItem("adminToken")
        return props.children
      }
  
}