import { useEffect, useState } from "react"
import api from "../api"
import MovieCard from "./MovieCard"
function FilmList(){
    const [filmList,setFilmList] = useState([])
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)
    const getMoviePage =async()=>{
        const result = await api.get(`movie?page=${page}&limit=${limit}`)
        setFilmList(result.data.response)
    }
    function changePage(isNext){
        setPage((prevPage)=>{
            if(isNext){
                return prevPage + 1
            }else if(!isNext && prevPage != 1){
                return prevPage - 1
            }
        })
    }
    useEffect(()=>{
        getMoviePage()
    },[page])
    return(
        <div>
            <span onClick={()=>{changePage(true)}}>+</span>
            <span onClick={()=>{changePage(false)}}>-</span>
            {filmList.map((film,index)=>{
                return <MovieCard key={index}  movieData={film}/>
            })}
        </div>
    )
}

export default FilmList