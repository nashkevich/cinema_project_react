import { useLocation } from "react-router"
import {useCinemaContext} from "../components/CinemaLayout"
import MovieCard from "../components/MovieCard"
function MoviePage(){
    const location = useLocation()
    const {basketSettings} = useCinemaContext()
    const movieData = location.state
    return(
        <div className="movie-page">
            <div className="movie-container">
            {/* <span onClick={()=>{navigate(-1)}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg></span> */}
            <div className="img-movie-container">
                <MovieCard movieData={movieData} basket={basketSettings.basket} setBasket={basketSettings.setBasket}></MovieCard>
            </div>
                <div className="movie-info">
                    <div className="movie-name">
                        <h2>{movieData.title} ({movieData.year})</h2>                        
                    </div>
                    <h3 className="description">Description :{movieData.description}</h3>
                    <h3>
                        Cast:{" "}
                        {movieData.cast.map((name, index) => 
                            index !== movieData.cast.length - 1 ? ` ${name},` : ` ${name}`
                        )}
                    </h3>                
            </div>
        </div>
        </div>
    )
}

export default MoviePage