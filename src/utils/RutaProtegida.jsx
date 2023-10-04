import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function RutaProtegida({pagActiva, redirectPath = "/"}) {
    if(!pagActiva){
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet />
}
