import { useEffect, useState,useRef } from "react"
import { useLocation, useNavigate } from "react-router"
import { useCinemaContext } from "./CinemaLayout";
import UserBar from "./UserBar"
function NavBarFilms(){
    const locationStart = useLocation()
    const navigate = useNavigate()
    const { searchSettings } = useCinemaContext();
    const menuRef = useRef(null)
    const [location,setLocation] = useState(locationStart.pathname)
    const [isLogin,setIsLogin] = useState(true)
    const [isOpen,setIsOpen] = useState(false)
    const checkUserLogin = ()=>{
        const token = localStorage.getItem('token')
        if(token){
            setIsLogin(()=>{
                return true
            })
        }
    }
    const handleClickOutSideMenu =  (event)=>{
        if(menuRef.current && !menuRef.current.contains(event.target)){
            setIsOpen(false)
        }
    }
    document.addEventListener('click',handleClickOutSideMenu)
    useEffect(()=>{
        setLocation(locationStart.pathname)
        console.log(locationStart.pathname)
    },[locationStart.pathname])
    useEffect(()=>{
        checkUserLogin()
    },[])
    return (
        <div className="navbar">
            <div className="navbar-top">
                <div className="content-nav">
                    <span><img src="/logo.png" width='70px' height="70px" /></span>
                    <h2 onClick={()=>{navigate('/cinema/main')}} className="logo">Block<br/>Buster</h2>
                    {/* <span onClick={()=>{navigate('/cinema/liked')}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg></span> */}
                </div>
                <div className="content-nav">
                    <button className="nav-btn">About</button>
                    <button className="nav-btn">Help</button>
                    {isLogin ? (<div ref={menuRef} className="user-info-container"><button onClick={()=>{setIsOpen((prev)=>{return !prev})}} className="user-btn">User</button>{isOpen && <UserBar></UserBar>}</div>): (<div>
                        <button onClick={()=>{navigate('/auth/login')}} className="nav-btn">Log In</button>
                        <button onClick={()=>{navigate('/auth/registration')}} className="main-btn">Sign Up</button>
                    </div>)}
                </div>
            </div>
            {location === "/cinema/main" ? (<><div className="search-section">
                <select onChange={(e)=>{searchSettings.setSearchGenres(e.target.value)}} name="genre" id="genre">
                        <option hidden value="">Categories</option>
                        <option value="">All</option>
                        <option value="Horror">Horror</option>
                        <option value="Drama">Drama</option>
                        <option value="Crime">Crime</option>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Fantasy">Fantasy</option>
                    </select>
                <input placeholder="Search for a movie" type="text" name='filmName' onChange={(e)=>searchSettings.setSearchQuery(e.target.value)}/>
            </div>
            <div className="limit-container">
                    <select onChange={(e)=>{searchSettings.setLimit(e.target.value)}} name="genre" id="genre">
                        <option disabled selected hidden value="10">Limit</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
            </div></>)
            :<div onClick={()=>{navigate(-1)}} className="back-box"><span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                </span>
                Back
                </div>
            }

        </div>
    )
}

export default NavBarFilms