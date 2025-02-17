import { useNavigate } from "react-router"
function UserBar(){
    const navigate = useNavigate()
    function Logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        navigate('/auth/login')
    }
    return (
        <div className="user-bar">
            <div onClick={()=>{navigate('/cinema/liked')}} className="user-bar-section">Liked</div>
            <div onClick={()=>{navigate('/cinema/liked')}} className="user-bar-section">Tickets</div>
            <div onClick={Logout} className="user-bar-section">Logout</div>
        </div>
    )
}

export default UserBar