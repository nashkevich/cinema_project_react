import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import UserBar from "./UserBar"
function NavBarFilms({setSearchQuery,setSearchGenres}){
    const navigate = useNavigate()
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
    useEffect(()=>{
        checkUserLogin()
    },[])
    return (
        <div className="navbar">
            <div className="navbar-top">
                <div className="content-nav">
                    <span><img src="/logo.png" width='70px' height="70px" /></span>
                    <h2 className="logo">Block<br/>Buster</h2>
                    {/* <span onClick={()=>{navigate('/cinema/liked')}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg></span> */}
                </div>
                <div className="content-nav">
                    <button className="nav-btn">About</button>
                    <button className="nav-btn">Help</button>
                    {isLogin ? (<div className="user-info-container"><button onClick={()=>{setIsOpen((prev)=>{return !prev})}} className="user-btn">U</button>{isOpen && <UserBar></UserBar>}</div>): (<div>
                        <button onClick={()=>{navigate('/auth/login')}} className="nav-btn">Log In</button>
                        <button onClick={()=>{navigate('/auth/registration')}} className="main-btn">Sign Up</button>
                    </div>)}
                </div>
            </div>
            <div className="search-section">
                <select onChange={(e)=>{setSearchGenres(e.target.value)}} name="genre" id="genre">
                        <option value="">All</option>
                        <option value="Horror">Horror</option>
                        <option value="Drama">Drama</option>
                        <option value="Crime">Crime</option>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Fantasy">Fantasy</option>
                    </select>
                <input placeholder="Search for a movie" type="text" name='filmName' onChange={(e)=>setSearchQuery(e.target.value)}/>
            </div>
        </div>
    )
}

export default NavBarFilms