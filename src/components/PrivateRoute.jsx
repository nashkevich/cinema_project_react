import { Outlet,Navigate } from "react-router"
import CinemaLayout from "./CinemaLayout"
import NavBarFilms from "./NavBarFilms"
function PrivateRoute(){
    const token = localStorage.getItem('token')
    return token ? <CinemaLayout><NavBarFilms></NavBarFilms><Outlet></Outlet></CinemaLayout> : <Navigate to='/auth/login'/>
}

export default PrivateRoute