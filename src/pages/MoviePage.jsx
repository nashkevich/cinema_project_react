import { useNavigate,useLocation } from "react-router"

function MoviePage(){
    const navigate = useNavigate()
    const location = useLocation()
    const movieData = location.state
    return(
        <div>
            <span onClick={()=>{navigate(-1)}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg></span>
            <img src={movieData.poster} />
            <h3>{movieData.title}</h3>
            <h3>{movieData.year}</h3>
            <h3>{movieData.description}</h3>
        </div>
    )
}

export default MoviePage