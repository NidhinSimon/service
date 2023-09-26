

import React from 'react'
import { Route, Navigate } from 'react-router-dom';



const AdminPrivateRoute = ({element,...rest}) => {
    const isAuthenticated=localStorage.getItem('jwtadmin')

return isAuthenticated ? (
    <Route {...rest} element={element}/>
):(
    <Navigate to="/login" />
)


}

export default AdminPrivateRoute
