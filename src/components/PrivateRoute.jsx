import { Outlet,Navigate } from "react-router"

function PrivateRoute(){
    const token = localStorage.getItem('token')
    return token ? <Outlet></Outlet> : <Navigate to='/auth/login'/>
}

export default PrivateRoute