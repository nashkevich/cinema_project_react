import {  useEffect, useState } from "react"
import api from "../api"
import MovieCard from "../components/MovieCard"
import { useCinemaContext } from "../components/CinemaLayout"
function UserLikedPage(){
    const [filmList,setFilmList] = useState([])
    let {searchSettings,basketSettings} = useCinemaContext()
    useEffect(()=>{
        const getLikedMovies = async ()=>{
            const result = await api.get('/movie?isLiked=true')
            if(result){
                console.log(result.data.response)
                setFilmList(result.data.response)
            }
        }
        getLikedMovies()
    },[])
    return (
        <>
        {filmList.length == 0 && <div className="no-movies-box">No Liked Movies</div>}
        <div className="film-list-wrapper">{filmList.map((film)=>{
           return <MovieCard key={film.id} movieData={film} basket={basketSettings.basket} setBasket={basketSettings.setBasket}></MovieCard>
        })}</div>
        </>
    )
}

export default UserLikedPage